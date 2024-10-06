import type { IrrigationScheduleRequest } from "./models";
import { LLM } from "./openai.provider";

async function testGetIrrigationSchedule() {
  // Create an instance of the LLM class
  const llm = new LLM();

  // Define the irrigation schedule request data
  const irrigationScheduleRequest: IrrigationScheduleRequest = {
    coordinates: "Peru", // Example coordinates (New York City)
    area: 10.0, // Area in hectares
    days_since_last_irrigation: 3, // Days since last irrigation
    liters: 5000.0, // Liters used in the last irrigation
    crop_type: "tunas", // Type of crop
    humidity_per_hour: [
      60, 65, 70, 75, 80, 85, 90, 95, 100, 85, 70, 60, 55, 50, 45, 40, 35, 30,
      25, 20, 15, 10, 5, 0,
    ], // Hourly humidity data
    temperature_per_hour: [
      15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
      33, 34, 35, 34, 33, 32,
    ], // Hourly temperature data
    evapotranspiration: 5.0, // Daily evapotranspiration in mm/day
  };

  try {
    // Call the getIrrigationSchedule method and get the response
    const scheduleResponse = await llm.getIrrigationSchedule(
      irrigationScheduleRequest,
    );

    // Log the response
    console.log(
      "Irrigation Schedule Response:",
      JSON.stringify(scheduleResponse, null, 2),
    );
  } catch (error) {
    console.error("Error fetching irrigation schedule:", error);
  }
}

// Run the test function
testGetIrrigationSchedule();
