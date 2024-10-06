import OpenAI from "openai";
import type { IrrigationInfo, IrrigationResponse } from "./models";

export class LLM {
	private openai: OpenAI;

	constructor() {
		this.openai = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});
	}

	async getIrrigationRecommendation(
		info: IrrigationInfo,
	): Promise<IrrigationResponse> {
		try {
			// First call: Get irrigation method
			const methodCompletion = await this.openai.chat.completions.create({
				model: "gpt-4o-mini",
				messages: [
					{
						role: "user",
						content: `Based on the following information give the best irrigation method:
Area type: ${info.area_type}
Plantation type: ${info.plantation_type}
Geographic location: ${info.geo}

Just answer with the irrigation method name`,
					},
				],
			});

			const method =
				methodCompletion.choices[0]?.message?.content?.trim() || "";
			if (!method) {
				throw new Error("Failed to generate irrigation method");
			}

			// Second call: Get explanation
			const explanationCompletion = await this.openai.chat.completions.create({
				model: "gpt-4o-mini",
				messages: [
					{
						role: "user",
						content: `Explain why the ${method} is the best irrigation method for the following type of plantation:
Area type: ${info.area_type}
Plantation type: ${info.plantation_type}
Geographic location: ${info.geo}`,
					},
				],
			});

			const explanation =
				explanationCompletion.choices[0]?.message?.content?.trim() || "";
			if (!explanation) {
				throw new Error("Failed to generate explanation");
			}

			// Prepare response
			const response: IrrigationResponse = {
				method: method,
				explanation: explanation,
			};

			return response;
		} catch (error) {
			console.error("An error occurred:", error);
			throw error; // Re-throw the error for the caller to handle
		}
	}
}
