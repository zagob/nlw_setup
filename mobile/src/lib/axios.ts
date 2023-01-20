import axios from "axios";

export const api = axios.create({
  // Endereço fisico IP
  baseURL: "http://localhost:3333/",
});
