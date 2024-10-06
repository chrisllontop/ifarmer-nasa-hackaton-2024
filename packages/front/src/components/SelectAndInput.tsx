import {
	Box,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from "@mui/material";
import React from "react";

interface SelectsContainerProps {
	selectValue: string;
	inputValue: string;
	handleSelectChange: (event: SelectChangeEvent<string>) => void;
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	selectContent: {
		label: string;
		options: { label: string; value: string }[];
	};
	inputContent: {
		label: string;
	};
}

export const SelectAndInput = ({
	selectValue,
	inputValue,
	handleSelectChange,
	handleInputChange,
	selectContent,
	inputContent,
}: SelectsContainerProps) => {
	const { label, options } = selectContent;

	return (
		<Box
			sx={{
				display: "flex",
				gap: "8px",
				width: "90%",
				margin: "4 auto",
			}}
		>
			<FormControl fullWidth sx={{ flex: 0.9 }}>
				<InputLabel id={`${label}-select-label`}>{label}</InputLabel>
				<Select
					labelId={`${label}-select-label`}
					id="select"
					value={selectValue}
					label={label}
					onChange={handleSelectChange}
				>
					{options.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<FormControl>
				<TextField
					id="input"
					placeholder={inputContent.label}
					value={inputValue}
					variant="outlined"
					onChange={handleInputChange}
				/>
				<FormHelperText>E.g. 19,000</FormHelperText>
			</FormControl>
		</Box>
	);
};
