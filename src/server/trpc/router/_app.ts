import { router } from "../trpc";
import { authRouter } from "./auth";
import { technologyRouter } from "./technology";
import { userRouter } from "./user";
import { workspaceRouter } from "./workspace";

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  technology: technologyRouter,
  workspace: workspaceRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
