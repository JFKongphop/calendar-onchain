import type { FC } from 'react';

interface ITimeLabelList {
  index: number;
}

const TimeLabelList: FC<ITimeLabelList> = ({ index }) => {
  return (
    <div
      className="h-[60px] w-full flex flex-row justify-between"
    >
      <p className="-mt-3 pl-1">{index}:00</p>
    </div>
  )
}

export default TimeLabelList;