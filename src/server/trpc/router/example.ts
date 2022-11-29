import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const exampleRouter = router({
	hello: publicProcedure
		.input(z.object({ text: z.string().nullish() }).nullish())
		.query(({ input }) => {
			return {
				greeting: `Hello ${input?.text ?? "world"}`,
				date: new Date()
			};
		}),
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.example.findMany();
	}),
	getTechs: protectedProcedure.query(({ ctx }) => {
		return ctx.prisma.technology.findMany()
	})
});
