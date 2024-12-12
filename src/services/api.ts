import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.2.153:3333",
  timeout: 700,
});

export { api };
