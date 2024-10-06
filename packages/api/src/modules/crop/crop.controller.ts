import type Elysia from "elysia";
import { authenticator } from "../auth/auth.validator";
import { PaginationQueryDto } from "../shared/general.dto.ts";
import {
	CropParamsDto,
	createCropDto,
	deleteCropDto,
	updateCropDto,
} from "./crop.dto";
import CropService from "./crop.service";

const cropService = new CropService();

export const cropController = (app: Elysia) =>
	app.group("/crops", (app) =>
		app
			.use(authenticator)
			.get(
				"/",
				async ({ user, query }) => {
					const page = Number(query.page) || 1;
					const limit = Number(query.limit) || 10;
					return await cropService.listByUserId(
						user._id.toString(),
						page,
						limit,
					);
				},
				{
					query: PaginationQueryDto,
				},
			)
			.get(
				"/:id",
				async ({ params, user }) => {
					const crop = await cropService.findById(
						user._id.toString(),
						params.id,
					);
					if (!crop) throw new Error("Crop not found");
					return crop;
				},
				{
					params: CropParamsDto,
				},
			)
			.guard(createCropDto, (app) =>
				app.post("/", async ({ user, body }) => {
					return await cropService.create(user._id.toString(), body);
				}),
			)
			.guard(updateCropDto, (app) =>
				app.patch("/:id", async ({ params, body, user }) => {
					const crop = await cropService.update(
						user._id.toString(),
						params.id,
						body,
					);
					if (!crop) throw new Error("Crop not found");
					return crop;
				}),
			)
			.guard(deleteCropDto, (app) =>
				app.delete("/:id", async ({ params, user }) => {
					const crop = await cropService.delete(user._id.toString(), params.id);
					if (!crop) throw new Error("Crop not found");
					return crop;
				}),
			),
	);
