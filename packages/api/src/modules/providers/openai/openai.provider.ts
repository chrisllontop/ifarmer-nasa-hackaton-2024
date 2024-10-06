import OpenAI from "openai";

interface IrrigationInfo {
  area_type: string;
  plantation_type: string;
  geo: string;
}

interface IrrigationResponse {
  method: string;
  explanation: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getIrrigationRecommendation = async (
  info: IrrigationInfo,
): Promise<IrrigationResponse> => {
  try {
    // First call: Get irrigation method
    const methodCompletion = await openai.chat.completions.create({
      model: "gpt-4",
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

    const method = methodCompletion.choices[0]?.message?.content?.trim() || "";
    if (!method) {
      throw new Error("Failed to generate irrigation method");
    }

    const explanationCompletion = await openai.chat.completions.create({
      model: "gpt-4",
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
};
