import { router, publicProcedure } from "../trpc";

export const appsRouter = router({
	getAll: publicProcedure
	.query(async ({ ctx }) => {
		const app = await ctx.prisma.app.findMany();
		return app
	}),
});
