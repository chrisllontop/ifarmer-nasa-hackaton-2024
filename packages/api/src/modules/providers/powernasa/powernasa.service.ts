import dayjs from 'dayjs';
import { 
  FORMATS, 
  type Coordinates,
  type DateRange,
  type TimeLocation
} from '../../../config/common.interfaces';

export class PowerNasaService {

  public dates: DateRange = { start: new Date(), end: new Date() }
  public coodinates: Coordinates = { lat: 0, lon: 0 }
  private baseUrl = 'https://power.larc.nasa.gov/api'

  constructor({ coordinates, dates }: TimeLocation) {
    this.coodinates = coordinates;
    this.dates = dates;
  }

  private execute = () => {
    let headers = new Headers();
    const dates = `start=${dayjs(this.dates.start).format('YYYY')}&end=${dayjs(this.dates.end).format('YYYY')}`
    const coords = `latitude=${this.coodinates.lat}&longitude=${this.coodinates.lon}`
    const format = `format=${FORMATS.JSON}`
    const url = `${this.baseUrl}/application/indicators/point?${dates}&${coords}&${format}`
    console.log(url)  
    return fetch(
      url,
      { headers }
    )
  }

  getWeatherParams = () => {
    return this.execute();
  }
}