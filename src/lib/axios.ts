import axios from "axios";
import { APIS } from "./config";

const { baseURL } =  APIS

export default axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
    baseURL,
    withCredentials: true, // important for refresh cookie
});
