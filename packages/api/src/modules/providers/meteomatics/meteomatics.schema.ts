import type { Coordinates, DateRange } from "../../../config/common.interfaces";

export enum PARAMS {
	HIST_RAIN_DAYS = "rain_days:d",
	PROB_SNOW_FALL = "prob_snowfall:p",
	RELATIVE_HUMIDITY = "relative_humidity",
	APARENT_TEMPERTURE = "t_apparent",
	ELEVATION_TEMPERTURE = "t",
  CLEAR_SKY_RADIATION = "clear_sky_rad",
  WIND_SPEED = "wind_speed",
  PROB_PRESSURE = "pressure"
}

export enum TEMP_UNITS {
  CELSIUS = 'C',
  FARENHEIT = 'F',
  KELVIN = 'K'
}
