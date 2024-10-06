import OpenAI from "openai";
import type {
  IrrigationInfo,
  IrrigationResponse,
  IrrigationScheduleRequest,
  IrrigationScheduleResponse,
} from "./models";

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

  async getIrrigationSchedule(
    info: IrrigationScheduleRequest,
  ): Promise<IrrigationScheduleResponse> {
    try {
      // Single call to get irrigation schedule in JSON
      const scheduleCompletion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `You are an agricultural assistant specializing in irrigation optimization. Your task is to calculate the best times to irrigate a crop based on the following input data. The irrigation times should minimize evaporation, so they should be early in the morning or late in the afternoon.

Input data:
-  Geographic location: ${info.coordinates}
-  Area of the crop: ${info.area} hectares
-  Last irrigation: ${info.days_since_last_irrigation} days ago, ${info.liters} liters
-  Type of crop: ${info.crop_type}
-  Weather data for the next 5 days (hourly):
  - Humidity: ${info.humidity_per_hour.join(", ")}
  - Temperature: ${info.temperature_per_hour.join(", ")}
-  Approximate daily evapotranspiration: ${info.evapotranspiration} mm/day

Use this information to determine the best irrigation times for each day of the week. Return the response in markdown JSON format as shown below:

\`\`\`json
{
  "monday": {
    "time": [
      {
        "starttime": "05:00",//Best time to start irrigation
        "endtime": "08:00"// Best time to end irrigation
      },
      {
        "starttime": "18:00",
        "endtime": "20:00"
      }
    ],
    "liters": "xxx liters" //amount of liters to use
  },
  "tuesday": {
    "time": [
      {
        "starttime": "05:00",
        "endtime": "08:00"
      },
    ],
    "liters": "xxx liters" //amount of liters to use
  },
... rest of the week
}
\`\`\`
Remember just answer with the markdown JSON blob.`,
          },
        ],
      });

      // Extract JSON from the response
      const scheduleText =
        scheduleCompletion.choices[0]?.message?.content?.trim() || "";
      const jsonMatch = scheduleText.match(/```json\s*([\s\S]*?)\s*```/);
      if (!jsonMatch || !jsonMatch[1]) {
        throw new Error("Failed to extract JSON schedule");
      }

      const schedule: IrrigationScheduleResponse = JSON.parse(jsonMatch[1]);

      return schedule;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  }
}
