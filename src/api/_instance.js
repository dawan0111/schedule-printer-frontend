import axios from 'axios'

const instanceAxios = axios.create({
  baseURL: process.env.NODE_ENV !== 'production' ? "http://localhost:4000" : "/"
})

instanceAxios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem("auth_token");

export default instanceAxios