// import { FC } from 'react';

import { calendarABI } from "@/abi/calendar";
import { FC } from "react";
import { useContractWrite } from "wagmi";

// interface IUseWriteContract<T> {
//   functionName: string;

// }

// function useWriteContract<T> ({
//   functionName,

// }: IUseWriteContract<T>) {
//   return (
//     <div>useWriteContract</div>
//   )
// }

// export default useWriteContract

const useWriteContractHook = (functionName: string, args: (string | number)[]) => {
  const { data: returnMessage, isLoading, isError } = useContractWrite({
    address: '0x30dc63a7D2F46738abF580D19289CDE87B71D904',
    abi: calendarABI,
    functionName,
    args
  });

  console.log('load', isLoading)
  console.log('error', isError)

  return returnMessage!
}

export default useWriteContractHook;