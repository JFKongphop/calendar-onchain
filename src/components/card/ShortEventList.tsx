import type { FC } from 'react';

interface IShortEventList {
  height: number;
  title: string;
}

const ShortEventList: FC<IShortEventList> = ({ 
  height,
  title 
}) => {
  const shortTitle = (title: string) => {
    if (title.length > 12) {
      return title.slice(0, 15) + ' ...';
    }
    return title
  } 

  return (
    <div
      style={{
        height: `${height}px`
      }}
      className="bg-calendar-minor-theme text-sm rounded-sm mx-1 px-1.5 flex items-center"
    >
      {shortTitle(title)}
    </div>
  )
}

export default ShortEventList;