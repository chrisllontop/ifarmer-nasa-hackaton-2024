import { KeyboardArrowLeft } from "@mui/icons-material";
import { Button, MobileStepper } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useProgressStepper } from "../context/ProgressBar.tsx";

interface ProgressStepperProps {
	steps: number;
}
export const ProgressStepper = ({ steps }: ProgressStepperProps) => {
	const { activeStep, setActiveStep } = useProgressStepper();

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	return (
		<MobileStepper
			variant="progress"
			steps={steps}
			position="static"
			activeStep={activeStep}
			sx={{
				maxWidth: "400px",
				padding: 0,
				justifyContent: "flex-start",
				gap: "12px",
			}}
			nextButton={""}
			backButton={
				<Button
					size="small"
					onClick={handleBack}
					disabled={activeStep === 0}
					sx={{ paddingLeft: 0, color: grey["A400"] }}
				>
					{activeStep > 2 ? <KeyboardArrowLeft /> : ""}
					Paso {activeStep}
				</Button>
			}
		/>
	);
};
