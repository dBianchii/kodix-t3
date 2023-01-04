import { router } from "../trpc";
import { appsRouter } from "./apps";
import { authRouter } from "./auth";
import { technologyRouter } from "./technology";
import { userRouter } from "./user";
import { workspaceRouter } from "./workspace";
import { textToSql } from "./apps/textToSql";
import { stripeRouter } from "./stripe";

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  technology: technologyRouter,
  workspace: workspaceRouter,
  app: appsRouter,
  textToSql: textToSql,
  stripe: stripeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
