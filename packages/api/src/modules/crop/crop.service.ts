import { Model, Types } from "mongoose";
import Crop, { type ICrop as ICrop } from "./crop.schema.ts";

class CropService {
	private model: Model<ICrop>;

	constructor() {
		this.model = Crop;
	}

	// Create a new crop
	async create(userId: string, cropData: Partial<ICrop>): Promise<ICrop> {
		try {
			const newCrop = new this.model({
				...cropData,
				user: new Types.ObjectId(userId),
			});
			return await newCrop.save();
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Error creating crop: ${error.message}`);
			} else {
				throw new Error("An unknown error occurred while creating crop");
			}
		}
	}

	// Read a single crop by ID
	async findById(userId: string, id: string): Promise<ICrop | null> {
		try {
			return await this.model.findOne({ _id: id, user: userId }).exec();
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Error fetching crop: ${error.message}`);
			} else {
				throw new Error("An unknown error occurred while fetching crop");
			}
		}
	}

	// Update a crop
	async update(
		userId: string,
		id: string,
		updateData: Partial<ICrop>,
	): Promise<ICrop | null> {
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
	async delete(userId: string, id: string): Promise<ICrop | null> {
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
		page: number = 1,
		limit: number = 10,
	): Promise<{
		crops: (ICrop & { _id: Types.ObjectId })[];
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
				crops: crops as (ICrop & { _id: Types.ObjectId })[],
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
