# NuxtShadeKit

基于 **Nuxt 4** + **Tailwind CSS v4** + **shadcn-vue** 的现代全栈模板项目，集成 **OAuth 认证**、**接口安全防护**、统一 UI 体系、完善的工程化配置，可作为企业级项目的起点或个人快速开发的脚手架。

⚡️ 本仓库已设置为 GitHub Template，可一键复制开始你的项目。

<p align="center">
  <a href="README.en.md">English</a> | <a href="#">中文</a>
</p>

![NuxtShadeKit](./public/image/image.png)

## 📋 功能计划

- [x] **Nuxt 4 基础架构** - 完整的 SSR/SSG 支持
- [x] **Tailwind CSS v4 集成** - 原子化样式系统
- [x] **shadcn-vue 组件库** - 40+ 高质量 UI 组件
- [x] **GitHub OAuth 登录** - 基于 nuxt-auth-utils
- [x] **安全防护体系** - CSRF、CORS、CSP 完整配置
- [x] **代码规范** - ESLint + Prettier + Husky
- [x] **TypeScript 支持** - 完整类型定义
- [x] **开发工具** - Nuxt DevTools 集成
- [x] **暗色模式切换** - 主题系统完善
- [x] **国际化支持** - i18n 多语言配置
- [x] **数据库集成** - Drizzle ORM + PostgreSQL
- [ ] **日志系统** - 统一日志收集和分析
- [ ] **Docker 部署** - 容器化部署方案

## ✨ 核心特性

### 🎨 现代化技术栈

- **Nuxt 4** — 最新版本，极速开发体验，完整的 SSR/SSG 支持
- **Tailwind CSS v4** — 新版原子化样式系统，性能更优
- **shadcn-vue** — 基于 Radix UI 的高质量 Vue 组件库
- **TypeScript** — 完整类型支持，提升开发效率
- **Drizzle ORM** — 类型安全的 SQL ORM，配合 PostgreSQL 数据库

### 🔐 身份认证 (nuxt-auth-utils)

- **多种 OAuth 登录** — GitHub、Google、Microsoft、Discord 等
- **会话管理** — 安全的服务端会话存储
- **路由保护** — 中间件自动保护需要认证的页面
- **类型安全** — 完整的 TypeScript 类型定义

### 🛡️ 安全防护 (nuxt-security)

- **CSRF 防护** — 跨站请求伪造攻击防护
- **CORS 配置** — 灵活的跨域资源共享控制
- **安全响应头** — CSP、HSTS、X-Frame-Options 等
- **速率限制** — API 接口防刷保护
- **XSS 防护** — 内容安全策略自动配置

### 🧱 UI 组件体系

- **shadcn-vue 组件** — Button、Card、Dialog、Form 等 40+ 组件
- **暗色模式** — 内置主题切换支持
- **响应式设计** — 移动端优先的设计理念
- **可定制** — 完全控制组件样式和行为

### 🛠️ 工程化配置

- **ESLint + Prettier** — 统一的代码规范
- **Husky + lint-staged** — Git 提交前自动格式化
- **VSCode 配置** — 插件推荐和工作区最佳实践配置
- **Nuxt DevTools** — 强大的开发调试工具
- **模块化结构** — 清晰的目录组织

## 📁 项目结构

```
NuxtShadeKit
├── app/
│   ├── components/          # Vue 组件
│   │   └── ui/             # shadcn-vue UI 组件
│   ├── composables/        # 组合式函数
│   ├── layouts/            # 布局组件
│   ├── middleware/         # 路由中间件
│   ├── pages/              # 页面路由
│   └── app.vue             # 应用入口
├── server/
│   ├── api/                # API 路由
│   ├── database/           # 数据库相关
│   │   ├── schema.ts       # 数据库模式定义
│   │   ├── user.db.ts      # 用户数据库操作
│   │   └── migrations/     # 数据库迁移文件
│   ├── routes/
│   │   └── auth/           # OAuth 认证路由
│   │       └── github.get.ts
│   ├── types/              # 服务端类型定义
│   │   └── auth.d.ts
│   └── utils/              # 服务端工具函数
│       ├── drizzle.ts      # 数据库连接
│       └── id.ts           # ID 生成工具
├── drizzle.config.ts       # Drizzle 配置
├── nuxt.config.ts          # Nuxt 配置
└── package.json
```

## 🚀 快速开始

### 1. 使用模板创建项目

点击 GitHub 页面右上角 **Use this template** → **Create a new repository**

或通过命令：

```bash
npx degit yourname/NuxtShadeKit my-project
cd my-project
```

### 2. 安装依赖

```bash
pnpm install
# 或 yarn install
# 或 npm install
```

### 3. 配置环境变量

创建 `.env` 文件并配置以下变量：

```env
# Session 密钥（必须）
NUXT_SESSION_PASSWORD=your-secret-password-min-32-chars

# GitHub OAuth（用于 GitHub 登录）
NUXT_OAUTH_GITHUB_CLIENT_ID=your-github-client-id
NUXT_OAUTH_GITHUB_CLIENT_SECRET=your-github-client-secret

# PostgreSQL 数据库连接
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

### 4. 启动开发环境

```bash
pnpm dev
```

访问 `http://localhost:3000`

## 🔐 认证系统 (nuxt-auth-utils)

### 快速配置 GitHub OAuth

1. **创建 GitHub OAuth App**
   - 访问 [GitHub Developer Settings](https://github.com/settings/developers)
   - **Callback URL**: `http://localhost:3000/auth/github`

2. **配置环境变量** (`.env`)

```env
NUXT_OAUTH_GITHUB_CLIENT_ID=your_client_id
NUXT_OAUTH_GITHUB_CLIENT_SECRET=your_client_secret
```

3. **服务端路由** (`server/routes/auth/github.get.ts`)

```typescript
export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: { name: user.name, email: user.email, avatar: user.avatar_url },
    });
    return sendRedirect(event, "/");
  },
});
```

4. **前端触发登录**

```vue
<button @click="navigateTo($localePath('/auth/github'), { external: true })">
  GitHub 登录
</button>
```

### 路由保护

```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware(async () => {
  const { data } = await useFetch("/api/_auth/session");
  if (!data.value?.user) return navigateTo("/login");
});
```

### 支持的 OAuth 提供商

GitHub、Google、Microsoft、Discord、Twitch、LinkedIn、Facebook 等 — [查看完整列表](https://github.com/Atinux/nuxt-auth-utils#supported-oauth-providers)

## 🛡️ 安全防护 (nuxt-security)

### 核心配置 (`nuxt.config.ts`)

```typescript
export default defineNuxtConfig({
  modules: ["nuxt-security"],

  security: {
    csrf: true, // CSRF 防护
    headers: {
      contentSecurityPolicy: {
        "img-src": ["'self'", "data:", "https:"],
      },
    },
  },

  routeRules: {
    "/api/**": { csurf: { enabled: true } },
  },
});
```

### 主要功能

| 功能           | 说明                                             |
| -------------- | ------------------------------------------------ |
| **CSRF 防护**  | 跨站请求伪造攻击防护，自动生成和验证 Token       |
| **CORS 配置**  | 灵活的跨域资源共享控制                           |
| **安全响应头** | X-Frame-Options、X-Content-Type-Options、HSTS 等 |
| **CSP 策略**   | 内容安全策略，防止 XSS 攻击                      |
| **速率限制**   | API 接口防刷保护                                 |

### 生产环境建议

- ✅ 启用 HTTPS
- ✅ 启用 API 路由的 CSRF 保护
- ✅ 配置严格的 CSP 策略
- ✅ 设置合理的速率限制
- ✅ 配置 HSTS 响应头

## 🗄️ 数据库 (Drizzle ORM + PostgreSQL)

### 核心配置

项目集成了 **Drizzle ORM** 作为类型安全的 SQL ORM，配合 **PostgreSQL** 数据库使用。

#### 配置文件 (`drizzle.config.ts`)

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

#### 数据库模式 (`server/database/schema.ts`)

```typescript
import { char, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 用户表
export const users = pgTable("users", {
  id: char("id", { length: 26 }).primaryKey(), // ULID
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"), // OAuth 登录时可以为空
  avatar: text("avatar"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// OAuth 账户表
export const accounts = pgTable("accounts", {
  userId: char("user_id", { length: 26 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  provider: varchar("provider", { length: 15 }).notNull(),
  providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
});
```

### 环境变量配置

在 `.env` 文件中添加数据库连接：

```env
# PostgreSQL 数据库连接
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

### 开发命令

```bash
# 生成数据库迁移文件
pnpm db:generate

# 推送模式变更到数据库（开发环境）
pnpm db:push

# 运行数据库迁移（生产环境）
pnpm db:migrate

# 打开 Drizzle Studio（数据库管理界面）
pnpm db:studio
```

### 数据库操作示例

#### 在服务端 API 中使用

```typescript
// server/api/users.get.ts
import { db } from "~/server/utils/drizzle";
import { users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const allUsers = await db.select().from(users);
  return allUsers;
});
```

#### 创建用户

```typescript
import { db } from "~/server/utils/drizzle";
import { users } from "~/server/database/schema";
import { createUserId } from "~/server/utils/id";

const newUser = await db
  .insert(users)
  .values({
    id: createUserId(),
    name: "用户名",
    email: "user@example.com",
  })
  .returning();
```

### 主要特性

| 特性            | 说明                                       |
| --------------- | ------------------------------------------ |
| **类型安全**    | 完整的 TypeScript 类型推导，编译时错误检查 |
| **SQL 优先**    | 接近原生 SQL 的查询语法，性能优异          |
| **迁移管理**    | 自动生成和管理数据库迁移文件               |
| **关系查询**    | 支持复杂的表关系和联合查询                 |
| **Studio 工具** | 内置的数据库管理界面，可视化操作           |

### 生产环境部署

1. **数据库准备**：
   - 创建 PostgreSQL 数据库实例
   - 配置连接字符串到环境变量

2. **运行迁移**：

   ```bash
   pnpm db:migrate
   ```

3. **Cloudflare Pages 配置**：
   - 在环境变量中添加 `DATABASE_URL`
   - 确保数据库可从 Cloudflare 网络访问

## 🎨 UI 组件

支持 40+ 高质量组件：Button、Card、Dialog、Form、Table、Select、Popover 等 — [完整列表](https://www.shadcn-vue.com/)

## 🛠️ 开发工具

### 开发命令

```bash
# 项目开发
pnpm dev       # 启动开发服务器
pnpm build     # 构建生产版本
pnpm preview   # 预览生产构建
pnpm lint      # 代码格式化和检查

# 数据库操作
pnpm db:generate  # 生成数据库迁移文件
pnpm db:push      # 推送模式变更到数据库（开发环境）
pnpm db:migrate   # 运行数据库迁移（生产环境）
pnpm db:studio    # 打开 Drizzle Studio 数据库管理界面
```

## 🚀 部署到 Cloudflare Pages

本项目已配置为部署到 **Cloudflare Pages**（相比 Workers，Pages 在国内访问更稳定）。

### 方式一：使用 Wrangler CLI 部署

1. **安装 Wrangler**（如果尚未安装）：

```bash
npm install -g wrangler
# 或
pnpm add -g wrangler
```

2. **登录 Cloudflare**：

```bash
wrangler login
```

3. **构建并部署**：

```bash
pnpm build
pnpm deploy
# 或直接使用
wrangler pages deploy dist --project-name=nuxt-shade-kit
```

**预览构建结果**（本地测试）：

```bash
pnpm build
wrangler pages dev dist
```

### 方式二：GitHub Actions 自动部署（推荐）

项目已配置 GitHub Actions 工作流，推送到 `master` 或 `main` 分支时会自动构建并部署到 Cloudflare Pages。

#### 配置步骤：

1. **获取 Cloudflare API Token**：
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 进入 **My Profile** → **API Tokens**
   - 点击 **Create Token** → **Create Custom Token**
   - 配置权限：
     - **Account** → **Cloudflare Pages** → **Edit**
   - 复制生成的 Token

2. **获取 Account ID**：
   - 在 Cloudflare Dashboard 右侧边栏可以看到 **Account ID**

3. **配置 GitHub Secrets**：
   - 进入你的 GitHub 项目仓库 → **Settings** → **Secrets and variables** → **Actions**
   - 添加以下 Secrets：
     ```
     CLOUDFLARE_API_TOKEN      # Cloudflare API Token
     CLOUDFLARE_ACCOUNT_ID     # Cloudflare Account ID
     NUXT_OAUTH_GITHUB_CLIENT_ID       # GitHub OAuth Client ID（可选，如果构建时需要）
     NUXT_OAUTH_GITHUB_CLIENT_SECRET   # GitHub OAuth Client Secret（可选）
     NUXT_SESSION_PASSWORD             # Session 密钥（可选）
     DATABASE_URL                      # PostgreSQL 数据库连接（可选）
     ```

4. **首次部署**：
   - 推送到 `master` 或 `main` 分支
   - GitHub Actions 会自动触发构建和部署
   - 在 **Actions** 标签页查看部署状态

5. **在 Cloudflare 中创建 Pages 项目**（首次需要）：
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 进入 **Pages** → **创建项目**
   - 项目名称：`nuxt-shade-kit`
   - 选择 **直接上传** 或等待 GitHub Actions 首次部署

6. **配置兼容性标志**（重要）：
   - 在 Cloudflare Pages 项目设置中
   - 找到 **Functions** → **兼容性标志**
   - 启用 **Node.js 兼容性**（`nodejs_compat`）

7. **配置环境变量**（在 Cloudflare Dashboard 中）：
   - 进入项目设置 → **环境变量**
   - 添加以下变量：
     ```
     NUXT_OAUTH_GITHUB_CLIENT_ID=your-github-client-id
     NUXT_OAUTH_GITHUB_CLIENT_SECRET=your-github-client-secret
     NUXT_SESSION_PASSWORD=your-secret-password-min-32-chars
     DATABASE_URL=postgresql://username:password@host:5432/database
     ```

### 方式三：通过 Cloudflare Dashboard 部署

1. **连接 Git 仓库**：
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 进入 **Pages** → **创建项目** → **连接到 Git**
   - 授权并选择你的 GitHub/GitLab 仓库

2. **配置构建设置**：
   - **项目名称**：`nuxt-shade-kit`
   - **生产分支**：`main` 或 `master`
   - **构建命令**：`pnpm install && pnpm build`
   - **构建输出目录**：`dist`
   - **Node.js 版本**：`22`

3. **配置兼容性标志**（重要）：
   - 在项目设置中找到 **Functions** 或 **兼容性标志** 设置
   - 启用 **Node.js 兼容性**（`nodejs_compat`）
   - 或者在 **设置** → **Functions** → **兼容性标志** 中添加：`nodejs_compat`
   - ⚠️ **必须配置**：否则部署会失败，提示 "No such module node:buffer"

4. **配置环境变量**：在项目设置中添加以下环境变量：

   ```
   NUXT_OAUTH_GITHUB_CLIENT_ID=your-github-client-id
   NUXT_OAUTH_GITHUB_CLIENT_SECRET=your-github-client-secret
   NUXT_SESSION_PASSWORD=your-secret-password-min-32-chars
   ```

5. **部署**：
   - 点击 **保存并部署**
   - 部署完成后，你将获得一个 `*.pages.dev` 的域名

### 配置自定义域名

1. 在 Cloudflare Pages 项目设置中，点击 **自定义域名**
2. 输入你的域名并按照提示配置 DNS
3. 确保 SSL/TLS 模式设置为 **完全（Full）**

### 注意事项

- ⚠️ **Node.js 兼容性标志**：必须在 Cloudflare Dashboard 中启用 `nodejs_compat` 兼容性标志，否则部署会失败
- ⚠️ **环境变量安全**：敏感信息（如 OAuth Secret、Session Password）应通过 Cloudflare Dashboard 的环境变量设置，不要提交到 Git
- ✅ **GitHub OAuth Callback URL**：部署后需要更新为 `https://your-domain.pages.dev/auth/github`
- 📝 **自动部署**：连接 Git 后，每次推送到主分支都会自动触发部署
- 🔧 **CLI 部署**：使用 CLI 部署时，兼容性标志已通过 `--compatibility-flags=nodejs_compat` 参数传递

### VSCode 插件推荐

项目已配置 `.vscode/extensions.json`，首次打开项目时 VSCode 会自动提示安装推荐插件：

**必备插件**：

- Vue - Official (Volar)
- Nuxtr
- Tailwind CSS IntelliSense
- ESLint
- Prettier

**推荐插件**：

- GitLens
- Error Lens
- Path Intellisense
- Auto Rename Tag

**工作区配置**：项目已包含最佳实践的 `.vscode/settings.json`，包括自动格式化、ESLint 修复等

**Git 提交**: 已配置 Husky + lint-staged，提交时自动格式化代码

## 📚 相关文档

- [Nuxt 4 文档](https://nuxt.com/)
- [nuxt-auth-utils 文档](https://github.com/Atinux/nuxt-auth-utils)
- [nuxt-security 文档](https://nuxt-security.vercel.app/)
- [shadcn-vue 文档](https://www.shadcn-vue.com/)
- [Tailwind CSS v4 文档](https://tailwindcss.com/)
- [Drizzle ORM 文档](https://orm.drizzle.team/)
- [PostgreSQL 文档](https://www.postgresql.org/docs/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

本项目基于 [MIT License](LICENSE)，可自由用于商业项目。
