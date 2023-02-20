import { createTRPCRouter } from "./trpc";
import { appsRouter } from "./routers/apps";
import { authRouter } from "./routers/auth";
import { technologyRouter } from "./routers/technology";
import { userRouter } from "./routers/user";
import { workspaceRouter } from "./routers/workspace";
import { textToSql } from "./routers/apps/textToSql";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  auth: authRouter,
  technology: technologyRouter,
  workspace: workspaceRouter,
  app: appsRouter,
  textToSql: textToSql,
});

// export type definition of API
export type AppRouter = typeof appRouter;
