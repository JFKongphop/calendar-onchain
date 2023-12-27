import type { FC, ReactNode } from 'react'

interface IConsoleEventCelendarCard {
  children: ReactNode;
}

const ConsoleEventCelendarCard: FC<IConsoleEventCelendarCard> = ({ children }) => {
  return (
    <div 
      className="flex flex-row justify-between items-center p-4 rounded-md border-2 border-calendar-main-theme shadow-lg"
    >
      {children}
    </div>
  )
}

export default ConsoleEventCelendarCard;