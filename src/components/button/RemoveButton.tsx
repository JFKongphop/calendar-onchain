import { FC } from 'react';

interface IRemoveButton {
  onToggleLeaveParticipation: () => void;
}

const RemoveButton: FC<IRemoveButton> = ({ onToggleLeaveParticipation }) => {
  return (
    <button
      className="border-2 border-red-500 px-1 text-red-500 bg-white hover:bg-red-500/20 text-sm rounded-md"
      onClick={onToggleLeaveParticipation}
    >
      Remove
    </button>
  )
}

export default RemoveButton;