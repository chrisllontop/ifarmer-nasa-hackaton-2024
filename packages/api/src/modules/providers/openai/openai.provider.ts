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

  private getNextFiveDates(): string[] {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 5; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const formattedDate = `${nextDate.getDate().toString().padStart(2, "0")}/${(nextDate.getMonth() + 1).toString().padStart(2, "0")}`;
      dates.push(formattedDate);
    }

    return dates;
  }

  async getIrrigationSchedule(
    info: IrrigationScheduleRequest,
  ): Promise<IrrigationScheduleResponse> {
    try {
      // Get the current date
      const today = new Date();
      const currentDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}`;

      const scheduleCompletion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `You are an agricultural assistant specializing in irrigation optimization. Your task is to calculate the best times to irrigate a crop based on the following input data. The irrigation times should minimize evaporation, so they should be early in the morning or late in the afternoon.

Current date: ${currentDate}

Input data:
-  Geographic location: ${info.coordinates}
-  Area of the crop: ${info.area} hectares
-  Last irrigation: ${info.days_since_last_irrigation} days ago, ${info.liters} liters
-  Type of crop: ${info.crop_type}
-  Weather data for the next 5 days (hourly):
  - Humidity: ${info.humidity_per_hour.join(", ")}
  - Temperature: ${info.temperature_per_hour.join(", ")}
-  Approximate daily evapotranspiration: ${info.evapotranspiration} mm/day

Analyze this information and determine the best 5 days for irrigation, you can make predictions base on that, you can deside the best 5 dates in a period of 1  month. Consider factors such as optimal humidity and temperature conditions for the crop type. Return the response in markdown JSON format as shown below:

\`\`\`json
{
  "<Selected date>": { 
    "time": [
      {
        "starttime": "05:00", // Best time to start irrigation
        "endtime": "08:00" // Best time to end irrigation
      },
      {
        "starttime": "18:00",
        "endtime": "20:00"
      }
    ],
    "liters": "xxx liters" // Amount of liters to use
  },
  "<Selected date>": {
    "time": [
      {
        "starttime": "05:00",
        "endtime": "08:00"
      }
    ],
    "liters": "xxx liters" // Amount of liters to use
  },
  // Continue similarly for the next dates
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
