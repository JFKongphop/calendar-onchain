import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import { monthIndexData } from "@/redux/selector/monthIndex.selector";
import { addMonthIndexState } from "@/redux/slice/monthIndex.slice";

import MonthSlideHandler from "../button/MonthSlideHandler";
import CalendarRangeDropdown from "../dropdown/CalendarRangeDropdown";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { shortAddrss } from "@/utils/shortAddress";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useLocation } from "react-router-dom";

const CalendarHeader = () => {
  const [showTimeRangeHandler, setShowTimeRangeHandler] = useState<boolean>(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const monthIndex = useSelector(monthIndexData);

  const handlePrevMonth = useCallback(() => {
    dispatch(addMonthIndexState(monthIndex - 1));
  }, [monthIndex])
  
  const handleNextMonth = useCallback(() => {
    dispatch(addMonthIndexState(monthIndex + 1));
  }, [monthIndex])

  const {address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { connect } = useConnect();

  const disconnectWallet = () => {
    disconnect();
  }

  const connectWellet = () => {
    if (isConnected) navigator.clipboard.writeText(address!);
    
    connect({ connector: new MetaMaskConnector() });
  }

  useEffect(() => {
    const path = location.pathname.split('/');
    const lenghtOfPathElement = path.length;
    if(path[lenghtOfPathElement - 1] === 'event') {
      setShowTimeRangeHandler(false);
    }
    else {
      setShowTimeRangeHandler(true);
    }
  }, [location]);

  return (
    <header 
      className="px-2 py-2 flex items-center border-b-2 text-calendar-main-theme border-calendar-main-theme relative justify-between"
    >
      {
        showTimeRangeHandler 
        ?
        (
          <div className="flex flex-row items-center gap-6">
            <h2 className="text-xl font-bold">
              Calendar
            </h2>
            <CalendarRangeDropdown />
            <div className="flex flex-row gap-4">
              <MonthSlideHandler
                type={'left'}
                onSlideMonth={handlePrevMonth}
              />
              <MonthSlideHandler 
                type={'right'}
                onSlideMonth={handleNextMonth}
              />
            </div>
            <h2 className="text-xl font-bold">
              {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
            </h2>
          </div>
        )
        :
        (
          <h2 className="text-xl font-bold">
          Calendar
        </h2>
        )
      }
      <button 
        className="font-bold text-xl border-2 border-calendar-main-theme px-4 py-2 w-[200px] rounded-md"
        onClick={connectWellet}
      >
        {
          isConnected
          ? shortAddrss(address!) 
          : 'Connect Wallet'
        }
      </button>
    </header>
  );
}

export default CalendarHeader;