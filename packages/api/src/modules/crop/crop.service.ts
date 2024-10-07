import type { Model, Types } from "mongoose";
import type { WithMetadata } from "../shared/general.dto.ts";
import Crop, { type CropDtoType } from "./crop.schema.ts";
import { LLM } from "../providers/openai/openai.provider.ts";
import type {
	IrrigationScheduleRequest,
	IrrigationScheduleResponse,
} from "../providers/openai/models.ts";

class CropService {
	private readonly model: Model<CropDtoType>;
	private llm: LLM;

	constructor() {
		this.model = Crop;
		this.llm = new LLM();
	}

	async create(userId: string, cropData: Partial<CropDtoType>) {
		try {
			const newCrop = new this.model({
				...cropData,
				user: userId,
			});
			const newCropResponse = await newCrop.save();
			return newCropResponse.toJSON();
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Error creating crop: ${error.message}`);
			} else {
				throw new Error("An unknown error occurred while creating crop");
			}
		}
	}

	// Read a single crop by ID
	async findById(
		userId: string,
		id: string,
	): Promise<WithMetadata<CropDtoType>> {
		try {
			const document = await this.model
				.findOne({ _id: id, user: userId })
				.exec();
			if (!document) throw new Error("Crop not found");
			return document.toJSON();
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Error fetching crop: ${error.message}`);
			} else {
				throw new Error("An unknown error occurred while fetching crop");
			}
		}
	}

	// Update a crop
	async update(userId: string, id: string, updateData: Partial<CropDtoType>) {
		try {
			return await this.model
				.findOneAndUpdate({ _id: id, user: userId }, updateData, { new: true })
				.exec();
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Error updating crop: ${error.message}`);
			} else {
				throw new Error("An unknown error occurred while updating crop");
			}
		}
	}

	// Delete a crop
	async delete(userId: string, id: string): Promise<CropDtoType | null> {
		try {
			return await this.model
				.findOneAndDelete({ _id: id, user: userId })
				.exec();
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Error deleting crop: ${error.message}`);
			} else {
				throw new Error("An unknown error occurred while deleting crop");
			}
		}
	}

	// List crops by user ID with pagination
	async listByUserId(
		userId: string,
		page = 1,
		limit = 10,
	): Promise<{
		data: (CropDtoType & { _id: Types.ObjectId })[];
		total: number;
		page: number;
		totalPages: number;
	}> {
		try {
			const skip = (page - 1) * limit;
			const [crops, total] = await Promise.all([
				this.model.find({ user: userId }).skip(skip).limit(limit).exec(),
				this.model.countDocuments({ user: userId }),
			]);

			const totalPages = Math.ceil(total / limit);

			return {
				data: crops,
				total,
				page,
				totalPages,
			};
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Error listing crops: ${error.message}`);
			} else {
				throw new Error("An unknown error occurred while listing crops");
			}
		}
	}

	// New method to get irrigation schedule for a specific crop
	async getIrrigationScheduleForCrop(
		userId: string,
		cropId: string,
	): Promise<IrrigationScheduleResponse> {
		try {
			// Retrieve the crop using Mongoose
			const crop = await this.model
				.findOne({ _id: cropId, user: userId })
				.exec();
			if (!crop) {
				throw new Error("Crop not found");
			}

			// Prepare the IrrigationScheduleRequest
			const irrigationRequest: IrrigationScheduleRequest = {
				location: crop.geoLocation || "Unknown", // Use default or handle appropriately
				area: parseFloat(crop.area), // Assuming area is stored as a string
				days_since_last_irrigation: this.calculateDaysSince(
					crop.lastIrrigationDate!,
				),
				liters: 1000, // Example value, adjust as needed or retrieve from crop data, I think we should sen this is the API?
				crop_type: crop.cropType || "Unknown", // Handle unknowns
				humidity_per_hour: this.getExampleHumidityData(), // Replace with actual data
				temperature_per_hour: this.getExampleTemperatureData(), // Replace with actual data
				evapotranspiration: "5", // Call the other llm fucntion to get this, but it need the json data
			};

			// Call getIrrigationSchedule
			const irrigationSchedule =
				await this.llm.getIrrigationSchedule(irrigationRequest);

			// Return the irrigation schedule response
			return irrigationSchedule;
		} catch (error) {
			console.error("An error occurred:", error);
			throw error;
		}
	}

	// Helper method to calculate days since last irrigation
	private calculateDaysSince(lastIrrigationDate: string): number {
		const lastDate = new Date(lastIrrigationDate);
		const today = new Date();
		const diffTime = Math.abs(today.getTime() - lastDate.getTime());
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	}

	// Example method to get humidity data
	private getExampleHumidityData(): number[] {
		return [
			60, 65, 70, 75, 80, 85, 90, 85, 80, 75, 70, 65, 60, 55, 50, 55, 60, 65,
			70, 75, 80, 85, 90, 85,
		];
	}

	// Example method to get temperature data
	private getExampleTemperatureData(): number[] {
		return [
			20, 21, 22, 23, 24, 25, 26, 25, 24, 23, 22, 21, 20, 19, 18, 19, 20, 21,
			22, 23, 24, 25, 26, 25,
		];
	}
}

export default CropService;
