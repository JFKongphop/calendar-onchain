import type { FC } from 'react';
import type { TimeRatio } from '@/components/calendar/type/type';

interface ISelectorList {
  onSelector: (data: TimeRatio) => void;
  data: TimeRatio;
}

const SelectorList: FC<ISelectorList> = ({
  onSelector,
  data
}) => {
  return (
    <button 
      className="h-8 hover:bg-calendar-minor-theme text-center w-full"
      onClick={() => onSelector(data)}
    >
      {data}
    </button>
  )
}

export default SelectorList;