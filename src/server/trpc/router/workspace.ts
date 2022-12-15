import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const workspaceRouter = router({
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.workspace.findMany();
	}),
	create: protectedProcedure
		.input(z.object({ userId: z.string().cuid(), workspaceName: z.string()}))
		.mutation(async ({ ctx, input }) => {

			const workspace = await ctx.prisma.workspace.create({ 
				data: {
  				  	name: input.workspaceName
  				},
			})

			await ctx.prisma.userWorkspace.create({
				data: {
					userId: input.userId,
					workspaceId: workspace.id
				}
			})

			return workspace
		}),
});
