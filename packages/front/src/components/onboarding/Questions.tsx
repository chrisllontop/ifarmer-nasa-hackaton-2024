import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	TextField,
	Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useProgressStepper } from "../../context/ProgressBar.tsx";
import { BasicDatePicker } from "../DatePicker.tsx";
import { MultipleOptions } from "../MultipleOptions.tsx";
import { SelectAndInput } from "../SelectAndInput.tsx";
import { IrrigationSystem } from "./questions/IrrigationSystem.tsx";

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

export const Questions = () => {
	const [firstQuestionOptions, setFirstQuestionOptions] =
		useState(initialOptions);
	const [selectValue, setSelectValue] = useState<string>("");
	const [inputValue, setInputValue] = useState<string>("");
	const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
	const [irrigationSystem, setIrrigationSystem] = useState<string>("");
	const [crop, setCrop] = useState<string>("");
	const [isQuestionAnswered, setIsQuestionAnswered] = useState<boolean>(false);

	const { activeStep, setActiveStep } = useProgressStepper();

	const questionIndex = activeStep - 3;

	useEffect(() => {
		const question = questions[questionIndex];
		setIsQuestionAnswered(question?.answered?.() ?? false);
	}, [
		firstQuestionOptions,
		selectValue,
		inputValue,
		selectedDate,
		irrigationSystem,
		crop,
		questionIndex,
	]);

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

	const handleIrrigationSystem = (systemTitle: string) => {
		setIrrigationSystem(systemTitle);
	};

	const handleSubmit = () => {
		if (questionIndex === questions.length - 1) {
			const body = {
				waterSource: firstQuestionOptions
					.filter((option) => option.checked)
					.map((option) => option.label),
				waterAmount: `${inputValue} ${selectValue}`,
				lastIrrigationDate: selectedDate?.toISO(),
				irrigationSystem,
				cropType: crop,
			};
			console.log(body);
		} else {
			setActiveStep(activeStep + 1);
		}
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
			answered: () => firstQuestionOptions.some((option) => option.checked),
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
			answered: () => selectValue !== "" && inputValue !== "",
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
			answered: () => selectedDate !== null,
		},
		{
			title: "What kind of irrigation system do you use for your crops?",
			component: <IrrigationSystem onClick={handleIrrigationSystem} />,
			answered: () => irrigationSystem !== "",
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
			answered: () => crop !== "",
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
				mt: 5,
				flex: 1,
			}}
		>
			<Box sx={{ flex: 0.8 }}>
				<Typography component="h1" variant="h5" textAlign="left" sx={{ mb: 4 }}>
					{questions[questionIndex].title}
				</Typography>
				<Box>{questions[questionIndex].component}</Box>
			</Box>
			<Button
				onClick={handleSubmit}
				variant="contained"
				fullWidth
				disabled={!isQuestionAnswered}
			>
				{questionIndex === questions.length - 1
					? "View my water report"
					: "Continue"}
			</Button>
		</Box>
	);
};
