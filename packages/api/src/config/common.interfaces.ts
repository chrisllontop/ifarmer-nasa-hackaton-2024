export type DateRange = {
	start: Date;
	end: Date;
};

export type Coordinates = {
  lat: number
  lon: number
}

export enum FORMATS {
  CSV = 'csv',
  JSON = 'json',
  XML = 'xml',
  HTML = 'html'
}

export interface TimeLocation { coordinates: Coordinates, dates: DateRange}
