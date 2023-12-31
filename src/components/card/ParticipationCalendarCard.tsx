import RemoveButton from '@/components/button/RemoveButton';

import type { FC } from 'react'
import { EventParticipationTitle } from '@/type'
import { shortAddrss } from '@/utils/shortAddress'
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

interface IParticipationCalendarCard {
  data: EventParticipationTitle;
  onToggleLeaveParticipation: () => void;
  onGetCurrentParticipationData: (data: EventParticipationTitle) => void;
}

const ParticipationCalendarCard: FC<IParticipationCalendarCard> = ({
  data,
  onToggleLeaveParticipation,
  onGetCurrentParticipationData
}) => {
  const navigate = useNavigate();


  const getCurrentParticipationData = () => {
    onGetCurrentParticipationData(data)
  }

  const calendarNavigateHandler = () => {
    const currentMonth = dayjs().format('MMM').toLowerCase();
    const title = data.title.split(' ').map((word) => word[0] + word.slice(1)).join('-');
    navigate(`/calendar-event/participation/${data.calendarIndex}/${title}/month/${currentMonth}`);
  }

  // participation

  return (
    <div
      className="flex flex-col border-2 border-calendar-main-theme shadow-lg h-60 rounded-lg p-2 gap-2 font-bold"
      onClick={getCurrentParticipationData}
    >
      <img
        src="https://images.unsplash.com/photo-1703209935484-34f5c826f1da?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="rounded-md w-full h-40"
        onClick={calendarNavigateHandler}
      />
      <div className="flex flex-col gap-1 pr-1">
        <div className="flex flex-row justify-between items-center">
          <p>{data.title}</p>
          <RemoveButton onToggleLeaveParticipation={onToggleLeaveParticipation}/>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p>Creater</p>
          <p>{shortAddrss(data.createdBy)}</p>
        </div>
      </div>
    </div>
  )
}

export default ParticipationCalendarCard;