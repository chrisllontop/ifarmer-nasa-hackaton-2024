import type { Coordinates, DateRange } from "../../../config/common.interfaces";

export enum PARAMS {
  HIST_RAIN_DAYS = 'rain_days:d',
  PROB_SNOW_FALL = 'prob_snowfall:p'
}

export enum FORMATS {
  CSV = 'csv',
  JSON = 'json',
  XML = 'xml',
  HTML = 'html'
}

export interface WheaterInit { coordinates: Coordinates, dates: DateRange}