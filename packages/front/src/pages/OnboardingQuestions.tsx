import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	SelectChangeEvent,
	TextField,
	Typography,
} from "@mui/material";
import { DateTime } from "luxon";
import React, { useState } from "react";
import { ProgressStepper } from "../components/ProgressStepper.tsx";
import { BasicDatePicker } from "../components/questions/DatePicker.tsx";
import { IrrigationSystem } from "../components/questions/IrrigationSystem.tsx";
import { MultipleOptions } from "../components/questions/MultipleOptions";
import { SelectAndInput } from "../components/questions/SelectAndInput";
import { useProgressStepper } from "../context/ProgressBar.tsx";

const inputContent = {
	label: "Quantity",
};

const selectContent = {
	label: "Unit",
	options: [
		{
			label: "Liters",
			value: "liters",
		},
		{
			label: "Gallons",
			value: "gallons",
		},
		{
			label: "m3",
			value: "Cubic meters",
		},
	],
};

const initialOptions = [
	{ label: "Groundwater", checked: false },
	{ label: "Surface water", checked: false },
	{ label: "Rainwater", checked: false },
	{ label: "I don’t have one yet", checked: false },
];

export const OnboardingQuestions = () => {
	const [questionIndex, setQuestionIndex] = useState(0);
	const [firstQuestionOptions, setFirstQuestionOptions] =
		useState(initialOptions);

	const [selectValue, setSelectValue] = useState<string>("");
	const [inputValue, setInputValue] = useState<string>("");
	const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
	const [crop, setCrop] = useState<string>("");

	const { activeStep, setActiveStep } = useProgressStepper();

	const handleFirstQuestionChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const { name, checked } = e.target;
		setFirstQuestionOptions((prevOptions) =>
			prevOptions.map((option) =>
				option.label === name ? { ...option, checked } : option,
			),
		);
	};

	const handleSelectChange = (event: SelectChangeEvent<string>) => {
		setSelectValue(event.target.value);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleDateChange = (date: DateTime | null) => {
		setSelectedDate(date);
	};

	const questions = [
		{
			title: "What are the water sources available for your farmland?",
			component: (
				<MultipleOptions
					options={firstQuestionOptions}
					handleChange={handleFirstQuestionChange}
				/>
			),
		},
		{
			title: "How much water do you use for irrigation each day?",
			component: (
				<SelectAndInput
					selectValue={selectValue}
					inputValue={inputValue}
					handleSelectChange={handleSelectChange}
					handleInputChange={handleInputChange}
					selectContent={selectContent}
					inputContent={inputContent}
				/>
			),
		},
		{
			title: "When was the last time you watered your crops?",
			component: (
				<BasicDatePicker
					label="Select date"
					value={selectedDate}
					handleChange={handleDateChange}
				/>
			),
		},
		{
			title: "What kind of irrigation system do you use for your crops?",
			component: <IrrigationSystem />,
		},
		{
			title: "Finally, what kind of crops do you grow?",
			component: (
				<FormControl fullWidth>
					<TextField
						id="crop"
						label="Type of crop"
						value={crop}
						variant="outlined"
						onChange={(e) => setCrop(e.target.value)}
					/>
					<FormHelperText>E.g. Grapes</FormHelperText>
				</FormControl>
			),
		},
	];

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-evenly",
				gap: "12px",
				width: "350px",
				margin: "auto",
				mt: 4,
			}}
		>
			<ProgressStepper
				steps={6}
				activeStep={activeStep}
				setActiveStep={setActiveStep}
			/>
			<Box sx={{ height: "85vh" }}>
				<Typography component="h1" variant="h5" textAlign="left" sx={{ mb: 4 }}>
					{questions[questionIndex].title}
				</Typography>
				<Box>{questions[questionIndex].component}</Box>
			</Box>
			<Button
				onClick={() => {
					setQuestionIndex((prevIndex) =>
						Math.min(prevIndex + 1, questions.length - 1),
					);
					setActiveStep(activeStep + 1);
				}}
				variant="contained"
				fullWidth
			>
				{questionIndex === questions.length - 1
					? "View my water report"
					: "Continue"}
			</Button>
		</Box>
	);
};
