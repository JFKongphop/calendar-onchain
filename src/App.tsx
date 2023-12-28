import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Provider } from 'react-redux';
import store from './redux/store';
import { useAccount, useConnect, useContractRead } from 'wagmi';
import { calendarABI } from './abi/calendar';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages';
import CalendarEvent from './pages/calendar-event';
import CalendarMonth from './pages/calendar-month';
import CalendarDate from './pages/calendar-date';
import Error from './pages/error';


const App = () => {

  // const c = useContractRead({
  //   address: '0xbF641DC13778536C666700DA9f3457856bC9A423',
  //   abi: [{
  //     "inputs": [
  //       {
  //         "internalType": "string",
  //         "name": "dayTimestamp",
  //         "type": "string"
  //       }
  //     ],
  //     "name": "getDayEvent",
  //     "outputs": [
  //       {
  //         "components": [
  //           {
  //             "internalType": "uint256",
  //             "name": "day",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "id",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "title",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "startTimestamp",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "endTimestamp",
  //             "type": "uint256"
  //           }
  //         ],
  //         "internalType": "struct Calendar.EventSchedule[]",
  //         "name": "",
  //         "type": "tuple[]"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }],
  //   functionName: 'getDayEvent',
  //   args: ['1699894800000-1699981199999']
  // });

  // console.log(c.data)

  const { connect } = useConnect();
  const { isConnected, address } = useAccount();

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
        </Route>
      </Route>
      <Route path='*' element={<Error/>}/>
    </Routes>
  )
}

export default App;
