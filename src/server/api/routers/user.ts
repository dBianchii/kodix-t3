import { string, z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findMany();
    if (!user) throw new Error("No Users Found");

    return user;
  }),
  getOne: protectedProcedure
    .input(z.object({ userId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      });
      if (!user) throw new Error("No User Found");

      return user;
    }),
  switchActiveWorkspace: protectedProcedure
    .input(z.object({ workspaceId: string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          activeWorkspaceId: input.workspaceId,
        },
      });
    }),
  subscriptionStatus: protectedProcedure.query(async ({ ctx }) => {
    const { session, prisma } = ctx;

    if (!session.user?.id) {
      throw new Error("Not authenticated");
    }

    const data = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
      select: {
        stripeSubscriptionStatus: true,
      },
    });

    if (!data) {
      throw new Error("Could not find user");
    }

    return data.stripeSubscriptionStatus;
  }),
});
