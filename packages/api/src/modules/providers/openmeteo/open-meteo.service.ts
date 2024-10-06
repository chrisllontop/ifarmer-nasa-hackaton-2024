import type { Coordinates } from '../../../config/common.interfaces';

export class OpenMeteoService {

  public coodinates: Coordinates = { lat: 0, lon: 0 }
  private baseUrl = 'https://api.open-meteo.com/v1'

  /**
   * Initializes the Meteomatics service by setting the API key.
   * Throws an error if the API key is missing.
   */
  constructor(coordinates: Coordinates) {
    this.coodinates = coordinates;
  }

  private execute = async () => {
    const coords = `latitude=${this.coodinates.lat}&longitude=${this.coodinates.lon}`
    const url = `${this.baseUrl}/elevation?${coords}`
    const res = await fetch(url);
    return res.json();
  }

  getElevation = async  () => {
    const elevation = await this.execute();
    return Math.round(elevation?.elevation[0]);
  }
}