import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const userRouter = router({
	getAll: publicProcedure
		.input(z.object({ userId: z.string().cuid() }).nullish())
		.query(async ({ ctx,input }) => {

		if (!input)
			return await ctx.prisma.user.findMany();

		return await ctx.prisma.user.findUnique({
			where: {
				id: input.userId
			}
		})
	}),
});
