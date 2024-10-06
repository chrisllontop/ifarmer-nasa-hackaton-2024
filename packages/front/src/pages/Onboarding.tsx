import { Box } from "@mui/material";
import { ProgressStepper } from "../components/ProgressStepper";
import { Questions } from "../components/onboarding/Questions";
import Search from "../components/onboarding/Search";
import { useProgressStepper } from "../context/ProgressBar";
import Layout from "../templates/layout.tsx";

export const Onboarding = () => {
	const { activeStep } = useProgressStepper();

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: activeStep > 2 ? "100vh" : "100%",
			}}
		>
			<ProgressStepper steps={7} />
			{activeStep < 3 ? (
				<Layout isWrapper>
					<Search />
				</Layout>
			) : (
				<Questions />
			)}
		</Box>
	);
};
