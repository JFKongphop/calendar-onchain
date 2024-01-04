import CalendarHeader from '@/components/calendar/CalendarHeader';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

const Index = () => {  
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      window.location.href = '/calendar-event';
    }
  }, [isConnected]);

  return (
    <div className="h-screen flex flex-col w-full mb-20 pb-20">
      <CalendarHeader />
    </div>
  );
};

export default Index;
