import { VITE_API_ENDPOINT } from "@/configs/enviroment";
import axios from 'axios';
import type { AxiosInstance } from 'axios';

const EventRequest: AxiosInstance = axios.create({
  baseURL: VITE_API_ENDPOINT,
});

const setInterceptor = (axiosInstance: AxiosInstance): AxiosInstance => {
  return axiosInstance;
};

setInterceptor(EventRequest);

export default EventRequest;