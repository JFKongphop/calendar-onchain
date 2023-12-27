import { useDispatch } from 'react-redux';
import { toggleCreateEventModal } from '@/redux/slice/showCreateEventModal.slice';

const ShowEventModalButton = () => {
  const dispatch = useDispatch()

  const showEventModalHandler = () => {
    dispatch(toggleCreateEventModal(true))
  };

  return (
    <button
      onClick={showEventModalHandler}
      className="border-2 border-calendar-minor-theme px-8 py-2 rounded-full flex items-center justify-center text-calendar-main-theme"
    >
      <span className="font-semibold">Create</span>
    </button>
  )
}

export default ShowEventModalButton;