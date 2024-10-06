import WaterIcon from "@mui/icons-material/Water";
import sprinklerSVG from "../../../assets/sprinkler.svg";
import { CardIcon } from "../../cards/CardIcon.tsx";

export const IrrigationSystem = () => {
	const handleClick = () => {
		console.log("click");
	};

	return (
		<>
			<CardIcon
				title="Surface Irrigation"
				description="For flood irrigation or furrow irrigation"
				icon={<WaterIcon />}
				onClick={handleClick}
			/>
			<CardIcon
				title="Localized Irrigation"
				description="For drip irrigation or sprinkler irrigation"
				icon={<img src={sprinklerSVG} alt="sprinkler" />}
				onClick={handleClick}
			/>
		</>
	);
};
