import { useMutation, useQuery } from "@tanstack/react-query";
import { addCrop, getCrops, updateCrop } from "../modules/crops.ts";

export const useAddCrop = () => {
	return {
		addCrop: useMutation({
			mutationFn: addCrop,
			onSuccess: (data) => {
				if (data.id) {
					localStorage.setItem("crop_id", data.id);
				}
			},
		}),
	};
};

export const useUpdateCrop = () => {
	return {
		updateCrop: useMutation({
			mutationFn: updateCrop,
		}),
	};
};

export const useGetCrops = () => {
	return useQuery({
		queryKey: ["crops"],
		queryFn: () => getCrops(),
	});
};
