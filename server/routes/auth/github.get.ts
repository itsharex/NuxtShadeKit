import { createOrUpdateUserByOAuth } from "~~/server/database/user.db";

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user: githubUser }) {
    try {
      const dbUser = await createOrUpdateUserByOAuth({
        id: githubUser.id.toString(),
        name: githubUser.name,
        email: githubUser.email || "",
        avatar: githubUser.avatar_url,
        provider: "github",
      });

      // 设置用户会话
      await setUserSession(event, {
        user: {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          avatar: dbUser.avatar || "",
        },
      });

      return sendRedirect(event, "/");
    } catch (error) {
      console.error("Database error during GitHub OAuth:", error);
      return sendRedirect(event, "/login?error=database_error");
    }
  },
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/login");
  },
});
