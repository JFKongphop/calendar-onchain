import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import { monthIndexData } from "@/redux/selector/monthIndex.selector";
import { addMonthIndexState } from "@/redux/slice/monthIndex.slice";

import MonthSlideHandler from "../button/MonthSlideHandler";
import CalendarRangeDropdown from "../dropdown/CalendarRangeDropdown";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { shortAddrss } from "@/utils/shortAddress";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ErrorInput, EventParams } from "@/type";
import { shortMonthToNumber } from "@/utils/shortMonthToNumber";
import { useContractCalendar } from "@/wagmi";
import { monthArrayToRangeTime } from "@/utils/rangeTimeStamp";
import { addRangeTime } from "@/redux/slice/rangeTime.slice";
import { useSelector } from "@/redux/store";
import { rangeTimeData } from "@/redux/selector/rangeTime.selector";
import CalendarRemoveMonthEventModal from "../modal/CalendarRemoveMonthEventModal";
import { Link } from "react-router-dom";

const CalendarHeader = () => {
  const [showTimeRangeHandler, setShowTimeRangeHandler] = useState<boolean>(false);
  const [showRemoveMonthEventModal, setShowRemoveMonthEventModal] = useState<boolean>(false);

  const { calendarIndex, calendarTitle, month, date } = useParams<EventParams>()

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const monthIndex = useSelector(monthIndexData);
  const {address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { connect } = useConnect();
  const rangeTime = useSelector(rangeTimeData);
  
  useEffect(() => {
    const rangeTimeArray = monthArrayToRangeTime(monthIndex);
    dispatch(addRangeTime(rangeTimeArray))
  }, [monthIndex]);

  const handlePrevMonth = useCallback(() => {
    let prevMonthIndex: number = dayjs().month();
    if (month) {
      prevMonthIndex = shortMonthToNumber(month) - 1;
    }
    if (date) {
      prevMonthIndex = dayjs(date).month() - 1;
    }

    const prevMonth = dayjs().month(prevMonthIndex).format('MMM').toLowerCase();
    const terminalURL = `/calendar-event/${calendarIndex}/${calendarTitle}/month/${prevMonth}`;
    navigate(terminalURL);
    dispatch(addMonthIndexState(monthIndex - 1));
  }, [monthIndex])
  
  const handleNextMonth = useCallback(() => {
    let nextMonthIndex: number = dayjs().month();
    if (month) {
      nextMonthIndex = shortMonthToNumber(month) + 1;
    }
    if (date) {
      nextMonthIndex = dayjs(date).month() + 1;
    }

    const nextMonth = dayjs().month(nextMonthIndex).format('MMM').toLowerCase();
    const terminalURL = `/calendar-event/${calendarIndex}/${calendarTitle}/month/${nextMonth}`;
    navigate(terminalURL);
    dispatch(addMonthIndexState(monthIndex + 1));
  }, [monthIndex])


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
    const path = location.pathname.split('/');
    const lenghtOfPathElement = path.length;
    const atCalendarEventPage = path[lenghtOfPathElement - 1] === 'calendar-event';
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