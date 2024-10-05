import type { Coordinates, DateRange } from '../../../config/common.interfaces';
import { PARAMS } from './meteomatics.schema';

export class MeteomaticsService {

  public dates: DateRange = { start: new Date(), end: new Date() }
  public coodinates: Coordinates = { lat: 0, lon: 0 }
  private param: string = ''
  private apiKey?: string;
  private baseUrl ='https://api.meteomatics.com';


  /**
   * Initializes the Meteomatics service by setting the API key.
   * Throws an error if the API key is missing.
   */
  constructor() {
    this.apiKey = process.env.METEO_API_KEY;

    if (!this.apiKey) {
      throw new Error('Missing API key for Meteomatics');
    }
  }

  private execute = () => {
    return fetch(
      `${this.baseUrl}/${this.dates.start}T00:00:00Z:${this.dates.end}T23:59:59Z:${this.coodinates.lat}:${this.coodinates.lon}/meteodata/${this.param}/value/point?model=best&format=json&api_key=${this.apiKey}`
    )
  }

  snowProbability = async ( coodinates: Coordinates, dates: DateRange ) => {
    this.coodinates = coodinates;
    this.dates = dates;
    this.param = PARAMS.PROB_SNOW_FALL
    return this.execute();
  }
  
  windPrediction = async () => {
  
  }
  
  humidityPrediction = async () => {
  
  }

}