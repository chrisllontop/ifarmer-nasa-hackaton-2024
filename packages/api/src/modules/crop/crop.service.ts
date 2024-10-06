import type { Model, Types } from "mongoose";
import type { WithMetadata } from "../shared/general.dto.ts";
import Crop, { type CropDtoType } from "./crop.schema.ts";

class CropService {
	private readonly model: Model<CropDtoType>;

	constructor() {
		this.model = Crop;
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
}

export default CropService;
