import { Elysia } from "elysia";
import { authenticator } from "../auth/auth.validator";
import {
	createPlantationDto,
	updatePlantationDto,
	getPlantationDto,
	deletePlantationDto,
	listPlantationsDto,
	plantationResponseDto,
	listPlantationsResponseDto,
	deletePlantationResponseDto,
} from "./crop.dto";
import PlantationService from "./crop.service";

const plantationService = new PlantationService();

export const plantationController = (app: Elysia) =>
	app.group("/plantations", (app) =>
		app
			.use(authenticator)
			.get(
				"/",
				async ({ user, query }) => {
					const page = Number(query.page) || 1;
					const limit = Number(query.limit) || 10;
					const result = await plantationService.listByUserId(
						user._id.toString(),
						page,
						limit,
					);
					return {
						...result,
						plantations: result.plantations.map((p) => ({
							...p.toObject(),
							_id: p._id.toString(),
							user: p.user.toString(),
						})),
					};
				},
				{
					...listPlantationsDto,
					...listPlantationsResponseDto,
				},
			)
			.get(
				"/:id",
				async ({ params, user }) => {
					const plantation = await plantationService.findById(
						user._id.toString(),
						params.id,
					);
					if (!plantation) return null;
					return {
						...plantation.toObject(),
						_id: plantation._id.toString(),
						user: plantation.user.toString(),
					};
				},
				{
					...getPlantationDto,
					...plantationResponseDto,
				},
			)
			.guard(createPlantationDto, (app) =>
				app.post(
					"/",
					async ({ user, body }) => {
						const plantation = await plantationService.create(
							user._id.toString(),
							body,
						);
						return {
							...plantation.toObject(),
							_id: plantation._id.toString(),
							user: plantation.user.toString(),
						};
					},
					{
						...plantationResponseDto,
					},
				),
			)
			.guard(updatePlantationDto, (app) =>
				app.put(
					"/:id",
					async ({ params, body, user }) => {
						const plantation = await plantationService.update(
							user._id.toString(),
							params.id,
							body,
						);
						if (!plantation) return null;
						return {
							...plantation.toObject(),
							_id: plantation._id.toString(),
							user: plantation.user.toString(),
						};
					},
					{
						...plantationResponseDto,
					},
				),
			)
			.guard(deletePlantationDto, (app) =>
				app.delete(
					"/:id",
					async ({ params, user }) => {
						const plantation = await plantationService.delete(
							user._id.toString(),
							params.id,
						);
						if (!plantation) return null;
						return {
							...plantation.toObject(),
							_id: plantation._id.toString(),
							user: plantation.user.toString(),
						};
					},
					{
						...deletePlantationResponseDto,
					},
				),
			),
	);
