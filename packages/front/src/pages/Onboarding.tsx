import { Box } from "@mui/material";
import { ProgressStepper } from "../components/ProgressStepper.tsx";
import { useProgressStepper } from "../context/ProgressBar.tsx";
import { OnboardingQuestions } from "./OnboardingQuestions.tsx";

export const Onboarding = () => {
	const { activeStep, setActiveStep } = useProgressStepper();

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
			}}
		>
			<ProgressStepper steps={7} />
			{activeStep >= 3 && <OnboardingQuestions />}
		</Box>
	);
};
