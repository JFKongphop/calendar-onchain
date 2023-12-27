import { combineReducers } from 'redux';
import events from './slice/event.slice';
import monthIndex from './slice/monthIndex.slice';
import rangeTime from './slice/rangeTime.slice';
import daySelected from './slice/daySelected.slice';
import showCreateEventModal from './slice/showCreateEventModal.slice'

export default combineReducers({
  events,
  monthIndex,
  rangeTime,
  daySelected,
  showCreateEventModal,
});