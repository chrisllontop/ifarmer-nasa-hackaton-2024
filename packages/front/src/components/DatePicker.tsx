import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import type { DateTime } from "luxon";

interface DatePickerProps {
	label: string;
	value: DateTime | null;
	handleChange: (date: DateTime | null) => void;
}
export const BasicDatePicker = ({
	label,
	value,
	handleChange,
}: DatePickerProps) => {
	return (
		<LocalizationProvider dateAdapter={AdapterLuxon}>
			<DemoContainer components={["DatePicker"]}>
				<DatePicker label={label} value={value} onChange={handleChange} />
			</DemoContainer>
		</LocalizationProvider>
	);
};
