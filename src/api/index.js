import _axios from 'axios'
import axios from './_instance'

const API = {
  async login (userId, password) {
    // eslint-disable-next-line no-undef
    const [encodeId, encodePassword] = [fnRSAEnc(""+userId), fnRSAEnc(""+password)]
    const formData = new FormData()

    formData.append("_userId", encodeId)
    formData.append("_password", encodePassword)
    formData.append("identck", "mobile_002")
    formData.append("sinbun", "")

    const response = await _axios.post("https://api.hanyang.ac.kr/oauth/login_submit.json", formData, {
      headers: {
        'Host': "api.hanyang.ac.kr",
      }
    })

    switch (response.data.code) {
      case '504':
      case '200': {
        const response = await axios.post("/login", {
          userId,
          password
        })
        return response.data;
      }
      default: {
        response.data.code = 400;
        return response.data;
      }
    }
  },

  async auth() {
    const response = await axios.get("/auth");
    return response.data;
  },

  async getAdmins() {
    const response = await axios.get("/auth/admins");
    return response.data;
  },

  async createAdmin(payload) {
    const response = await axios.post("/auth/admins", payload);
    return response.data;
  },

  async deleteAdmin(userId) {
    const response = await axios.delete(`/auth/admins/${userId}`);
    return response.data;
  },

  async getPrinters() {
    const response = await axios.get("/printers");
    return response.data;
  },

  async deletePrinter(printerId, printer) {
    const response = await axios.delete(`/printers/${printerId}`, printer);
    return response.data;
  },

  async updatePrinter(printerId, printer) {
    const response = await axios.put(`/printers/${printerId}`, printer);
    return response.data;
  },

  async createPrinter(printer) {
    const response = await axios.post("/printers", printer);
    return response.data;
  },

  async printerReservation(resInfo) {
    const response = await axios.post("/historys", {
      printerId: resInfo.printerId,
      name: ""+resInfo.name,
      phone: ""+resInfo.phone,
      outputHour: resInfo.outputHour,
      outputMinute: resInfo.outputMinute,
    })

    return response.data;
  },

  async getHistory(printerId) {
    const response = await axios.get(`/historys/${printerId}`);
    return response.data;
  },

  async getRanking() {
    const response = await axios.get('/historys/ranking');
    return response.data;
  },

  async deleteHistory() {
    const response = await axios.delete('/historys');
    return response.data;
  }
}

export default Object.keys(API).reduce((acc, val) => {
  if (typeof API[val] === "function") {
    return {
      ...acc,
      [val]: async (...payload) => {
        try {
          return await API[val](...payload);
        } catch (e) {
          return {
            message: e,
            code: 400
          };
        }
      }
    }
  } else {
    return { ...acc, [val]: API[val]}
  }
}, {})
