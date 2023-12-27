import { FC } from "react";

interface ICreateEventButton {
  title: string;
  disabled: boolean
  onSubmitEvent: () => void;
}

const CreateEventButton: FC<ICreateEventButton> = ({
  title,
  disabled,
  onSubmitEvent
}) => {
  return (
    <button 
      className={`bg-calendar-main-theme w-full hover:bg-calendar-main-theme/90 h-[40px] rounded-md text-white border font-semibold ${disabled && 'cursor-not-allowed'}`}
      onClick={onSubmitEvent}
      disabled={disabled}
    >
      {title}
    </button>
  )
}

export default CreateEventButton