import Axios from 'axios';

const apiUrl = `http://www.dnd5eapi.co/api/`;

const api = {
  async getConditions() {
    const conditions = await Axios.get(`${apiUrl}conditions`);
    const results = await Promise.all(
      conditions.data.results.map((cond) => {
        return Axios.get(cond.url)
      })
    )
    return results.map((cond) => {
      return cond.data
    })
  }
}

export default api;