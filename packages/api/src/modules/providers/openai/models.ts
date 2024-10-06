// Define the structure for irrigation recommendation request
export interface IrrigationInfo {
	area_type: string;
	plantation_type: string;
	geo: string;
}

// Define the structure for irrigation recommendation response
export interface IrrigationResponse {
	method: string;
	explanation: string;
}

// Define the structure for irrigation schedule request
export interface IrrigationScheduleRequest {
	location: string; //Peru,ecuador, etc
	area: number; // hectares
	days_since_last_irrigation: number;
	liters: number;
	crop_type: string;
	humidity_per_hour: number[]; // array of hourly humidity percentages
	temperature_per_hour: number[]; // array of hourly temperatures in degrees Celsius
	evapotranspiration: string;
}

// Define the structure for time range in the irrigation schedule
export interface TimeRange {
	starttime: string; // format "HH:MM"
	endtime: string; // format "HH:MM"
}

// Define the structure for irrigation schedule response
export interface IrrigationScheduleResponse {
	[day: string]: {
		time: TimeRange[];
		liters: string; // e.g., "1000 liters"
	};
}
