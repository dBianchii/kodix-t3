import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const workspaceRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ userId: z.string().cuid() }).nullish())
    .query(async ({ ctx, input }) => {
      if (!input?.userId) return await ctx.prisma.workspace.findMany();

      const workspaces = await ctx.prisma.workspace.findMany({
        where: {
          users: {
            some: {
              id: input.userId,
            },
          },
        },
      });

      return workspaces;
    }),
  create: protectedProcedure
    .input(z.object({ userId: z.string().cuid(), workspaceName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const workspace = await ctx.prisma.workspace.create({
        data: {
          name: input.workspaceName,
          users: {
            connect: [{ id: input.userId }],
          },
        },
      });

      return workspace;
    }),
  getOne: protectedProcedure
    .input(z.object({ workspaceId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const workspace = await ctx.prisma.workspace.findUnique({
        where: {
          id: input.workspaceId,
        },
      });

      if (!workspace)
        throw new TRPCError({
          message: "No Workspace Found",
          code: "NOT_FOUND",
        });

      return workspace;
    }),
  update: protectedProcedure
    .input(
      z.object({ workspaceId: z.string().cuid(), workspaceName: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      const workspace = await ctx.prisma.workspace.update({
        where: {
          id: input.workspaceId,
        },
        data: {
          name: input.workspaceName,
        },
      });
      return workspace;
    }),
});
