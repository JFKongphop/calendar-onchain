import { FC } from 'react';
import { 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight 
} from 'react-icons/hi';



interface MonthSlideHandler {
  type: 'left' | 'right';
  onSlideMonth: () => void;
}

const MonthSlideHandler: FC<MonthSlideHandler> = ({
  type,
  onSlideMonth,
}) => {
  return (
    <button
      onClick={onSlideMonth}
      className="text-[30px]"
    >
      {type === 'left' ?
        (
          <HiOutlineChevronLeft/>
        )
        :
        (
          <HiOutlineChevronRight/>
        )
      }
    </button>
  )
}

export default MonthSlideHandler;