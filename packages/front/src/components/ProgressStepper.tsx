import { KeyboardArrowLeft } from "@mui/icons-material";
import { Button, MobileStepper } from "@mui/material";
import { useProgressStepper } from "../context/ProgressBar.tsx";

interface ProgressStepperProps {
	steps: number;
	activeStep: number;
	setActiveStep: (value: number) => void;
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
			sx={{ maxWidth: 320, flexGrow: 1 }}
			nextButton={<></>}
			backButton={
				<Button
					size="small"
					onClick={handleBack}
					disabled={activeStep === steps}
				>
					<KeyboardArrowLeft />
					Paso {activeStep - 1}
				</Button>
			}
		/>
	);
};
