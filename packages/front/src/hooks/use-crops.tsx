import { useMutation } from "@tanstack/react-query";
import { addCrop, updateCrop } from "../modules/crops.ts";

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
