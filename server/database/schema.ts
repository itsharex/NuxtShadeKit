import { char, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 用户表
export const users = pgTable("users", {
  id: char("id", { length: 26 }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"), // OAuth 登录时可以为空
  avatar: text("avatar"),
  // 没有createdAt是 ULID 有序、包含时间戳。
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// OAuth 账户表（用于存储 GitHub 等第三方登录账户信息）
export const accounts = pgTable("accounts", {
  userId: char("user_id", { length: 26 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  provider: varchar("provider", { length: 15 }).notNull(),
  providerAccountId: varchar("provider_account_id", { length: 50 }).notNull(),
});

// 定义表关系
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

// 导出类型
export type User = typeof users.$inferSelect;
export type Account = typeof accounts.$inferSelect;
