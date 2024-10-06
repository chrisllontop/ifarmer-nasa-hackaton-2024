import { ReactNode, createContext, useContext, useState } from "react";

interface ProgressStepperContextType {
	activeStep: number;
	setActiveStep: (value: number) => void;
}

const ProgressStepperContext = createContext<
	ProgressStepperContextType | undefined
>(undefined);

export const useProgressStepper = () => {
	const context = useContext(ProgressStepperContext);
	if (!context) {
		throw new Error(
			"useProgressStepper must be used within a ProgressStepperProvider",
		);
	}
	return context;
};

export const ProgressStepperProvider = ({
	children,
}: { children: ReactNode }) => {
	const [activeStep, setActiveStep] = useState<number>(1);

	return (
		<ProgressStepperContext.Provider value={{ activeStep, setActiveStep }}>
			{children}
		</ProgressStepperContext.Provider>
	);
};
