import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const workspaceRouter = router({
	getAll: publicProcedure
	.input(z.object({ userId: z.string().cuid() }).nullish())
	.query(async ({ ctx, input }) => {
		
		if (!input?.userId) 
			return await ctx.prisma.workspace.findMany();
		

		const workspaces = await ctx.prisma.workspace.findMany({
		  	where: {
				users: {
					some: {
						id: input.userId
					}
				}
			},
		})

		return workspaces
	}),
	create: protectedProcedure
		.input(z.object({ userId: z.string().cuid(), workspaceName: z.string()}))
		.mutation(async ({ ctx, input }) => {
			const workspace = await ctx.prisma.workspace.create({ 
				data: {
  				  	name: input.workspaceName,
					users: {
						connect: [{ id: input.userId }]
					}
  				},
			})

			return workspace
		}),
});
