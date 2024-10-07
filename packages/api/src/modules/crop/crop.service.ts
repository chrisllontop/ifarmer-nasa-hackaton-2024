import type { Model, Types } from "mongoose";
import { MeteomaticsService } from "../providers/meteomatics/meteomatics.service.ts";
import type {
	IrrigationScheduleRequest,
	IrrigationScheduleResponse,
} from "../providers/openai/models.ts";
import { LLM } from "../providers/openai/openai.provider.ts";
import { OpenMeteoService } from "../providers/openmeteo/open-meteo.service.ts";
import type { WithMetadata } from "../shared/general.dto.ts";
import Crop, { type CropDtoType } from "./crop.schema.ts";

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
			const crop = await this.model
				.findOne({ _id: cropId, user: userId })
				.exec();
			if (!crop) {
				throw new Error("Crop not found");
			}

			// Prepare the IrrigationScheduleRequest
			const irrigationRequest: IrrigationScheduleRequest = {
				location: crop.geoLocation || "Unknown",
				area: crop.area,
				lastIrrigationDate: crop.lastIrrigationDate,
				waterAmount: crop.waterAmount,
				cropType: crop.cropType || "Unknown",
				humidityPerHour: await this.getHumidityData(crop),
				evapotranspiration: await this.llm.getEvapotranspiration(
					await this.getEvapotranspirationData(crop),
				),
			};

			// Call getIrrigationSchedule
			// Return the irrigation schedule response
			return await this.llm.getIrrigationSchedule(irrigationRequest);
		} catch (error) {
			console.error("An error occurred:", error);
			throw error;
		}
	}

	// Example method to get humidity data
	private async getHumidityData(crop: CropDtoType): Promise<string[]> {
		const meteomaticsService = new MeteomaticsService({
			dates: {
				start: new Date("2024-10-06"),
				end: new Date("2024-10-11"),
			},
			coordinates: crop.coordinates,
		});

		const openMeteoService = new OpenMeteoService(crop.coordinates);

		const humidityRangeResponse = await meteomaticsService.humidityPrediction(
			await openMeteoService.getElevation(),
		);

		// @ts-ignore
		const humidityRangeObj = humidityRangeResponse.data[0].coodinates[0].dates;
		return humidityRangeObj.map(
			(data: { date: Date; value: number }) =>
				`Date: ${data.date} (Value: ${data.value})`,
		);
	}

	private async getEvapotranspirationData(crop: CropDtoType): Promise<string> {
		const meteomaticsService = new MeteomaticsService({
			dates: {
				start: new Date("2024-10-06"),
				end: new Date("2024-10-11"),
			},
			coordinates: crop.coordinates,
		});

		const openMeteoService = new OpenMeteoService(crop.coordinates);

		const evapotranspirationResponse = await meteomaticsService.all(
			await openMeteoService.getElevation(),
		);

		return JSON.stringify(evapotranspirationResponse);
	}
}

export default CropService;
