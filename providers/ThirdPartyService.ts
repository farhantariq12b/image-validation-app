import axios from 'axios'

export default class ThirdPartyService {
  constructor() {}

  public static async postRquest(headers: any, payload: any, apiUrl: string) {
    try {
      const response = await axios.post(apiUrl, payload, { headers })
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }
}
