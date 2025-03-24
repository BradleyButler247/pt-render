import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_ADDRESS

class CryptoAPI {
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
    
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {};
        const params = (method === 'get') ? data : {};
    
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
    }

    static async getTokenList(start = 1, limit = 100) {
      const res = await this.request(`crypto/browse`, {
        start: start, 
        limit: limit
      });
      return res
    }

    static async getToken(idType, idVal) {
      if (idType === 'name') idType = 'slug'
      else if (idType === 'contract address') idType = 'address'

      const res = await this.request(`crypto/token`, {
        idType: idType,
        idVal: idVal
      });

      return res
    }

    static async getFavoriteTokens(tokenIDs) {
      const res = await this.request(`crypto/token/favorites`, {
        tokenIDs: tokenIDs
      });
      return res
    }

    static async getTokensByCat(catID, start = 1, limit = 100) {
      const res = await this.request(`crypto/categories/${catID}`, {
        catID: catID, 
        start: start, 
        limit: limit
      });
      return res
    }    

    static async getCats() {
      const res = await this.request(`crypto/categories/list`);
      return res
    }

    static async getCatID(tokenID) {
      const res = await this.request(`crypto/categories`, {
        tokenID: tokenID, 
      });
      return res
    }
}

export default CryptoAPI