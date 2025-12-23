import type { H3Event } from "h3";

const log = logger.withTag("Auth");

export default defineEventHandler(async (event: H3Event) => {
  const url = getRequestURL(event);
  if (url.pathname.startsWith("/api/") && !url.pathname.startsWith("/api/_auth/")) {
    const session = await getUserSession(event);
    if (!session.user) {
      log.warn("Unauthorized access attempt", { path: url.pathname });
      return {
        code: 401,
        message: "Unauthorized",
      };
    }
  }
});
