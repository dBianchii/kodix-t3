import { createTRPCRouter } from "../trpc";
import { appsRouter } from "./apps";
import { authRouter } from "./auth";
import { technologyRouter } from "./technology";
import { userRouter } from "./user";
import { workspaceRouter } from "./workspace";
import { textToSql } from "./apps/textToSql";

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
