import WaterIcon from "@mui/icons-material/Water";
import { useState } from "react";
import sprinklerSVG from "../../../assets/sprinkler.svg";
import { CardIcon } from "../../cards/CardIcon.tsx";

interface IrrigationSystemProps {
	onClick: (value: string) => void;
}
export const IrrigationSystem = ({ onClick }: IrrigationSystemProps) => {
	const [selectedCard, setSelectedCard] = useState<string>("");

	const handleCardClick = (title: string) => {
		setSelectedCard(title);
		onClick(title);
	};

	return (
		<>
			<CardIcon
				title="Surface Irrigation"
				description="For flood irrigation or furrow irrigation"
				icon={<WaterIcon />}
				onClick={() => handleCardClick("surface irrigation")}
				isSelected={selectedCard === "surface irrigation"}
			/>
			<CardIcon
				title="Localized Irrigation"
				description="For drip irrigation or sprinkler irrigation"
				icon={<img src={sprinklerSVG} alt="sprinkler" />}
				onClick={() => handleCardClick("localized irrigation")}
				isSelected={selectedCard === "localized irrigation"}
			/>
		</>
	);
};
