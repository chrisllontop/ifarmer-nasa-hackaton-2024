import type { Coordinates, DateRange } from '../../../config/common.interfaces';
import { FORMATS, PARAMS, type WheaterInit } from './meteomatics.schema';
import dayjs from 'dayjs';

export class MeteomaticsService {

  public dates: DateRange = { start: new Date(), end: new Date() }
  public coodinates: Coordinates = { lat: 0, lon: 0 }
  private param: PARAMS = PARAMS.HIST_RAIN_DAYS
  private username?: string
  private password?: string
  private baseUrl = 'https://api.meteomatics.com'


  /**
   * Initializes the Meteomatics service by setting the API key.
   * Throws an error if the API key is missing.
   */
  constructor({ coordinates, dates }: WheaterInit) {
    this.coodinates = coordinates;
    this.dates = dates;
    this.username = process.env.METEO_USERNAME
    this.password = process.env.METEO_PASSWORD

    if (!this.username || !this.password) {
      throw new Error('Missing API key for Meteomatics');
    }
  }

  private execute = () => {
    const frecuency = 'PT1H'
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + Buffer.from(this.username + ":" + this.password).toString('base64'))
    const dates = `${dayjs(this.dates.start).format('YYYY-MM-DD')}Z--${dayjs(this.dates.end).format('YYYY-MM-DD')}Z`
    const coords = `${this.coodinates.lat},${this.coodinates.lon}`
    const format = FORMATS.JSON
    const url = `${this.baseUrl}/${dates}:${frecuency}/${this.param}/${coords}/${format}`
    console.log(url)
    return fetch(
      url,
      { headers }
    )
  }

  snowProbability = async  () => {
    this.param = PARAMS.PROB_SNOW_FALL
    return this.execute();
  }
  
  windPrediction = async () => {
  
  }
  
  humidityPrediction = async () => {
  
  }

}