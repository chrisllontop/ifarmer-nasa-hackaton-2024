import client from "../utils/api.ts";

interface LocationBody {
	area: string;
	cropType?: string;
	geoLocation?: string;
	daysSinceLastIrrigation?: string;
	coordinates: {
		lat: number;
		lon: number;
	};
}

export const addCrop = async (body: LocationBody) => {
	const authToken = localStorage.getItem("access_token");

	const { data, error } = await client.api.crops.post(body, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});
	if (data) return data;
	throw error.value;
};

export const updateCrop = async (body: LocationBody) => {
	const authToken = localStorage.getItem("access_token");
	console.log(authToken);

	const { data, error } = await client.api.crops.put(body, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});
	if (data) return data;
	throw error.value;
};
