import type { FC } from 'react';

interface ISmallEventList {
  title: string;
}

const SmallEventList: FC<ISmallEventList> = ({ title }) => {
  return (
    <div 
      className="w-full rounded-md bg-calendar-minor-theme flex justify-start px-1 py-2"
    >
      {title}
    </div>
  )
}

export default SmallEventList;