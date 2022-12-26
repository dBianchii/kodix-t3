import { router, protectedProcedure } from "../../trpc";
import { env } from "../../../../env/server.mjs";
import { Configuration, OpenAIApi } from "openai";

import { z } from "zod";

export const textToSql = router({
	getAll: protectedProcedure
	.input(z.object({ text: z.string() }))
	.query(async () => {

		const configuration = new Configuration({
			apiKey: env.OPENAI_API_KEY,
		});
		const openai = new OpenAIApi(configuration);

		const response = await openai.createCompletion({
		  	model: "code-davinci-002",
		  	prompt: "### Postgres SQL tables, with their properties:\n#\n# Employee(id, name, department_id)\n# Department(id, name, address)\n# Salary_Payments(id, employee_id, amount, date)\n#\n### A query to list the names of the departments which employed more than 10 employees in the last 3 months\nSELECT",
		  	temperature: 0,
		  	max_tokens: 150,
		  	top_p: 1,
		  	frequency_penalty: 0,
		  	presence_penalty: 0,
		  	stop: ["#", ";"],
		});

		return response
	}),
});
