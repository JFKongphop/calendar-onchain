import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import { useHandleSlideMonth } from "@/custom-hook/useHandlePrevMonth";
import { useSelector } from "@/redux/store";
import { addRangeTime } from "@/redux/slice/rangeTime.slice";
import { rangeTimeData } from "@/redux/selector/rangeTime.selector";
import { monthIndexData } from "@/redux/selector/monthIndex.selector";

import { shortAddrss } from "@/utils/shortAddress";
import { monthArrayToRangeTime } from "@/utils/rangeTimeStamp";

import MonthSlideHandler from "@/components/button/MonthSlideHandler";
import CalendarRangeDropdown from "@/components/dropdown/CalendarRangeDropdown";
import CalendarRemoveMonthEventModal from "@/components/modal/CalendarRemoveMonthEventModal";


const CalendarHeader = () => {
  const [showTimeRangeHandler, setShowTimeRangeHandler] = useState<boolean>(false);
  const [showRemoveMonthEventModal, setShowRemoveMonthEventModal] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const monthIndex = useSelector(monthIndexData);
  const {address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { connect } = useConnect();
  const rangeTime = useSelector(rangeTimeData);
  
  useEffect(() => {
    const rangeTimeArray = monthArrayToRangeTime(monthIndex);
    dispatch(addRangeTime(rangeTimeArray))
  }, [monthIndex]);

  const handleNextMonth = useHandleSlideMonth('next');
  const handlePrevMonth = useHandleSlideMonth('prev');


  const disconnectWallet = () => {
    disconnect();
  }

  const connectWellet = () => {
    if (isConnected) navigator.clipboard.writeText(address!);
    
    connect({ connector: new MetaMaskConnector() });
  }

  const toggleRemoveMonthEventModal = () => {
    setShowRemoveMonthEventModal((prevShow) => !prevShow);
  }

  useEffect(() => {
    const path = pathname.split('/');
    const lenghtOfPathElement = path.length;
    const atCalendarEventPage = path[lenghtOfPathElement - 1] === 'calendar-event' || pathname === '/';
    if(atCalendarEventPage) {
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
      <CalendarRemoveMonthEventModal 
        rangeTime={rangeTime}
        showModal={showRemoveMonthEventModal}
        onCloseModal={toggleRemoveMonthEventModal}
        onLeaveParticipationSuccess={() => {}}
      />
      {
        showTimeRangeHandler 
        ?
        (
          <div className="flex flex-row items-center gap-6">
            <Link to="/calendar-event" className="text-xl font-bold">
              Calendar
            </Link>
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
          <Link to="/calendar-event" className="text-xl font-bold">
            Calendar
          </Link>
        )
      }
      <div className="flex flex-row gap-2">
        {
          showTimeRangeHandler
          &&
          (
            <button 
              className="font-bold text-xl border-2 border-red-500 text-red-500 py-2 text-center w-[100px] rounded-md"
              onClick={toggleRemoveMonthEventModal}
            >
              Remove
            </button>
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

      </div>
    </header>
  );
}

export default CalendarHeader;