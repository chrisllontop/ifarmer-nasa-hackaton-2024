import client from "../utils/api.ts";

interface AddCropBody {
	area: string;
	coordinates: {
		lat: number;
		lon: number;
	};
}
export interface UpdateCropBody {
	cropType: string;
	waterSources: string[];
	waterAmount: string;
	irrigationSystem: string;
	lastIrrigationDate: string;
}

export const addCrop = async (body: AddCropBody) => {
	const authToken = localStorage.getItem("access_token");

	const { data, error } = await client.api.crops.post(body, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});
	if (data) return data;
	throw error.value;
};

export const updateCrop = async (body: UpdateCropBody) => {
	const authToken = localStorage.getItem("access_token");
	const cropId = localStorage.getItem("crop_id");

	// @ts-ignore
	const { data, error } = await client.api.crops({ id: cropId }).patch(body, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});
	if (data) return data;
	throw error.value;
};

export const getCrops = async () => {
	const authToken = localStorage.getItem("access_token");

	const { data, error } = await client.api.crops.get({
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});
	if (data) return data;
	throw error.value;
};
