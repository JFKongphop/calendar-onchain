import { useEffect } from 'react';

import { useAccount, useConnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Index from './pages';
import CalendarEvent from './pages/calendar-event';
import CalendarMonth from './pages/calendar-month';
import CalendarDate from './pages/calendar-date';
import Error from './pages/error';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import dayjs from 'dayjs';

dayjs.extend(isSameOrAfter, isSameOrBefore)

const App = () => {
  const navigate = useNavigate();
  const { connect } = useConnect();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      connect({ connector: new MetaMaskConnector() });
    }
  }, []);

  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Index/>}/>
        <Route path='calendar-event'>
          <Route index element={<CalendarEvent/>}/>
          <Route path=':calendarIndex'>
            <Route path=':calendarTitle'>
              <Route path='month/:month' element={<CalendarMonth/>} />
              <Route path='date/:date' element={<CalendarDate/>} />
            </Route>
          </Route>
          <Route path='participation'>
            <Route path=':calendarIndex'>
              <Route path=':calendarTitle'>
                <Route path='month/:month' element={<CalendarMonth/>} />
                <Route path='date/:date' element={<CalendarDate/>} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path='*' element={<Error/>}/>
    </Routes>
  )
}

export default App;
