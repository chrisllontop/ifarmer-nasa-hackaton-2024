import {
	Box,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Typography,
} from "@mui/material";
import React from "react";

interface MultipleOptionsProps {
	options: { label: string; checked: boolean }[];
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MultipleOptions = ({
	options,
	handleChange,
}: MultipleOptionsProps) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: "12px",
				width: "90%",
				margin: "auto",
			}}
		>
			<Typography component="p" textAlign="left">
				Select one or more options
			</Typography>
			<Box sx={{ width: "90%", margin: "auto" }}>
				{options.map((option) => (
					<FormGroup key={option.label}>
						<FormControlLabel
							control={
								<Checkbox
									checked={option.checked}
									onChange={handleChange}
									name={option.label}
								/>
							}
							label={option.label}
						/>
					</FormGroup>
				))}
			</Box>
		</Box>
	);
};
