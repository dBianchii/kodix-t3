import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const appsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const app = await ctx.prisma.app.findMany();
    return app;
  }),
  getInstalledApps: protectedProcedure.query(async ({ ctx }) => {
    const apps = await ctx.prisma.app.findMany({
      where: {
        activeWorkspaces: {
          some: {
            id: ctx.session.user.activeWorkspaceId,
          },
        },
      },
    });

    return apps;
  }),
});
