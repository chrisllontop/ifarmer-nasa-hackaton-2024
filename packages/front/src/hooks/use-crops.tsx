import { useMutation } from "@tanstack/react-query";
import { addCrop } from "../modules/crops.ts";

export const useAddCrop = () => {
	return {
		addCrop: useMutation({
			mutationFn: addCrop,
		}),
	};
};
