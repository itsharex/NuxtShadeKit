import { eq, and } from "drizzle-orm";

import { users, accounts } from "./schema";
import type { User, Account } from "./schema";

/**
 * 根据 provider 和 providerAccountId 查找账户
 */
export async function findAccountByProvider(providerAccountId: string, provider: string): Promise<Account | null> {
  const db = useDrizzle();
  const result = await db
    .select()
    .from(accounts)
    .where(and(eq(accounts.provider, provider), eq(accounts.providerAccountId, providerAccountId)))
    .limit(1);

  return result[0] || null;
}

/**
 * 根据用户 ID 查找用户
 */
export async function findUserById(userId: string): Promise<User | null> {
  const db = useDrizzle();
  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);

  return result[0] || null;
}

/**
 * 根据邮箱查找用户
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  const db = useDrizzle();
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);

  return result[0] || null;
}

/**
 * 创建新用户
 */
export async function createUser(data: {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  password?: string | null;
}): Promise<User> {
  const db = useDrizzle();
  const result = await db
    .insert(users)
    .values({
      id: data.id,
      name: data.name,
      email: data.email,
      avatar: data.avatar || null,
      password: data.password || null,
    })
    .returning();

  return result[0];
}

async function updateUserEmail(userId: string, email: string): Promise<void> {
  const db = useDrizzle();
  await db.update(users).set({ email }).where(eq(users.id, userId));
}

/**
 * 创建账户关联
 */
export async function createAccount(data: {
  userId: string;
  provider: string;
  providerAccountId: string;
}): Promise<Account> {
  const db = useDrizzle();
  const result = await db
    .insert(accounts)
    .values({
      userId: data.userId,
      provider: data.provider,
      providerAccountId: data.providerAccountId,
    })
    .returning();

  return result[0];
}

/**
 * 通过 GitHub OAuth 创建或更新用户
 * 这是主要的业务逻辑函数，处理 GitHub 登录的用户创建/更新流程
 */
export async function createOrUpdateUserByOAuth(oAuthUser: OAuthUser): Promise<User> {
  // 1. 查找是否已存在该 OAuth 账户
  const existingAccount = await findAccountByProvider(oAuthUser.id, oAuthUser.provider);

  if (existingAccount) {
    // 2. 如果账户已存在
    const user = await findUserById(existingAccount.userId);
    if (user) {
      if (oAuthUser.email && user.email !== oAuthUser.email) {
        await updateUserEmail(user.id, oAuthUser.email);
      }
      return user;
    } else {
      throw new Error("User not found");
    }
  }

  // 3. 如果账户不存在，检查是否已存在相同邮箱的用户
  if (oAuthUser.email) {
    const existingUser = await findUserByEmail(oAuthUser.email);

    if (existingUser) {
      // 如果邮箱已存在，将 GitHub 账户关联到现有用户
      await createAccount({
        userId: existingUser.id,
        provider: oAuthUser.provider,
        providerAccountId: oAuthUser.id,
      });

      return existingUser;
    }
  }

  // 4. 创建新用户和账户
  const newUser = await createUser({
    id: createUserId(),
    name: oAuthUser.name || "",
    email: oAuthUser.email || "",
    avatar: oAuthUser.avatar || null,
    password: null, // OAuth 登录不需要密码
  });

  // 创建关联的账户记录
  await createAccount({
    userId: newUser.id,
    provider: oAuthUser.provider,
    providerAccountId: oAuthUser.id,
  });

  return newUser;
}
