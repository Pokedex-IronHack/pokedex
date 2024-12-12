import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export const api = axios.create({
  baseURL: API_BASE_URL,
});