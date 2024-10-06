import { Model, Types } from "mongoose";
import Plantation, { type IPlantation } from "./crop.schema.ts";

class PlantationService {
	private model: Model<IPlantation>;

	constructor() {
		this.model = Plantation;
	}

	// Create a new plantation
	async create(
		userId: string,
		plantationData: Partial<IPlantation>,
	): Promise<IPlantation> {
		try {
			const newPlantation = new this.model({
				...plantationData,
				user: new Types.ObjectId(userId),
			});
			return await newPlantation.save();
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Error creating plantation: ${error.message}`);
			} else {
				throw new Error("An unknown error occurred while creating plantation");
			}
		}
	}

	// Read a single plantation by ID
	async findById(userId: string, id: string): Promise<IPlantation | null> {
		try {
			return await this.model.findOne({ _id: id, user: userId }).exec();
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Error fetching plantation: ${error.message}`);
			} else {
				throw new Error("An unknown error occurred while fetching plantation");
			}
		}
	}

	// Update a plantation
	async update(
		userId: string,
		id: string,
		updateData: Partial<IPlantation>,
	): Promise<IPlantation | null> {
		try {
			return await this.model
				.findOneAndUpdate({ _id: id, user: userId }, updateData, { new: true })
				.exec();
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Error updating plantation: ${error.message}`);
			} else {
				throw new Error("An unknown error occurred while updating plantation");
			}
		}
	}

	// Delete a plantation
	async delete(userId: string, id: string): Promise<IPlantation | null> {
		try {
			return await this.model
				.findOneAndDelete({ _id: id, user: userId })
				.exec();
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Error deleting plantation: ${error.message}`);
			} else {
				throw new Error("An unknown error occurred while deleting plantation");
			}
		}
	}

	// List plantations by user ID with pagination
	async listByUserId(
		userId: string,
		page: number = 1,
		limit: number = 10,
	): Promise<{
		plantations: (IPlantation & { _id: Types.ObjectId })[];
		total: number;
		page: number;
		totalPages: number;
	}> {
		try {
			const skip = (page - 1) * limit;
			const [plantations, total] = await Promise.all([
				this.model.find({ user: userId }).skip(skip).limit(limit).exec(),
				this.model.countDocuments({ user: userId }),
			]);

			const totalPages = Math.ceil(total / limit);

			return {
				plantations: plantations as (IPlantation & { _id: Types.ObjectId })[],
				total,
				page,
				totalPages,
			};
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Error listing plantations: ${error.message}`);
			} else {
				throw new Error("An unknown error occurred while listing plantations");
			}
		}
	}
}

export default PlantationService;
