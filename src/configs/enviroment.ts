const ENV: ImportMetaEnv = import.meta.env;
import { Address } from 'wagmi'

const parseENV: { [key: string]: string } = {};

Object.entries(ENV).map((env) => {
  if (env[0].includes('VITE')) {
    parseENV[env[0]] = env[1]
  }
});

// env name variable
export const { 
  VITE_API_ENDPOINT,
  VITE_PINATA_API_KEY, 
  VITE_PINATA_API_SECRET, 
  VITE_PINATA_JWT 
} = parseENV;
const { VITE_CALENDAR_ADDRESS, VITE_HOLESKY_ADDRESS } = parseENV;
export const CALENDAR_ADDRESS = VITE_CALENDAR_ADDRESS as Address
export const CALENDAR_HOLESKY = VITE_HOLESKY_ADDRESS as Address