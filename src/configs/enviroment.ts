const ENV: ImportMetaEnv = import.meta.env;
import { Address } from 'wagmi'


const parseENV: { [key: string]: string } = {};

Object.entries(ENV).map((env) => {
  if (env[0].includes('VITE')) {
    parseENV[env[0]] = env[1]
  }
});

// env name variable
export const { VITE_API_ENDPOINT } = parseENV;
const { VITE_CALENDAR_ADDRESS } = parseENV;
export const CALENDAR_ADDRESS = VITE_CALENDAR_ADDRESS as Address