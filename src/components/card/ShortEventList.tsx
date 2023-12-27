import type { FC } from 'react';

interface IShortEventList {
  title: string;
}

const ShortEventList: FC<IShortEventList> = ({ title }) => {
  const shortTitle = (title: string) => {
    if (title.length > 12) {
      return title.slice(0, 15) + ' ...';
    }
    return title
  } 

  return (
    <div
      className="bg-calendar-minor-theme rounded-sm mx-1 px-1"
    >
      {shortTitle(title)}
    </div>
  )
}

export default ShortEventList;