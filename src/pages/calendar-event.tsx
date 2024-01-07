import { useCallback, useEffect, useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { useAccount } from 'wagmi';

import { useEthersSigner, useContractCalendar } from '@/wagmi';

import CreateEventButton from '@/components/button/CreateEventButton'
import CalendarHeader from '@/components/calendar/CalendarHeader'
import CreateEventTitleCelendarModal from '@/components/modal/CalendarEventHandlerModal';
import CreateTitleCelendarModal from '@/components/modal/CreateEventTitleCelendarModal';
import EventCalendarCard from '@/components/card/EventCalendarCard';
import CalendarLeaveEventModal from '@/components/modal/CalendarLeaveEventModal';
import ParticipationCalendarCard from '@/components/card/ParticipationCalendarCard';
import EmptyCalendarCard from '@/components/card/EmptyCalendarCard';
import ConsoleEventCelendarCard from '@/components/card/ConsoleEventCelendarCard';

import type{ CalendarHandler, EventParticipationTitle, EventTitle } from '@/type';

// 0xd73F821fcA522Cbb672F8354d25470DBf4948c9C
// 0xCd004500B361CFABaACE36963C990b5440E79400
// 0x344255C14CBEf9BC9b0301d282b08152819866Fd

const CalendarEvent = () => {
  const [eventTitles, setEventTitles] = useState<EventTitle[]>([]);
  const [eventParticipationTitles, setEventParticipationTitles] = useState<EventParticipationTitle[]>([]);
  const [eventTitle, setEventTitle] = useState<EventTitle>();
  const [participationEventTitle, setParticipationEventTitle] = useState<EventParticipationTitle>();
  const [currentCalendarIndex, setCurrentCalendarIndex] = useState<number>(0);
  const [calendarHandlerType, setCalendarHandlerType] = useState<CalendarHandler>('edit title');
  const [changeTitleSuccess, setChangeTitleSuccess] = useState<string>('');
  const [leaveParticipationEventSuccess, setLeaveParticipationEventSuccess] = useState<string>('');
  const [showCreateEventModal, setShowEventModal] = useState<boolean>(false);
  const [showHandlerEventModal, setShowHandlerEventModal] = useState<boolean>(false);
  const [showLeaveParticipationModal, setShowLeaveParticipationModal] = useState<boolean>(false);
  const [loadingEventTitles, setLoadingEventTitles] = useState<boolean>(false);
  const [loadingParticipationTitles, setLoadingParticipationTitles] = useState<boolean>(false);


  const { isConnected } = useAccount();
  const calendarContract = useContractCalendar();
  const signer = useEthersSigner();

  const toggleCreateEventModal = () => {
    setShowEventModal((showModal) => !showModal);
  }

  const toggleCalendarHandler = () => {
    setShowHandlerEventModal((prevShow) => !prevShow)
  }

  const toggleLeaveParticipation = () => {
    setShowLeaveParticipationModal((prevShow) => !prevShow);
  }

  const getCurrentCalerdarData = useCallback((index: number, eventTitle: EventTitle) => {
    setCurrentCalendarIndex(index);
    setEventTitle(eventTitle);
  }, []);

  const getCurrentParticipationData = useCallback((participationTitle: EventParticipationTitle) => {
    setParticipationEventTitle(participationTitle);
  }, []);

  const getCalendarHandlerType = (type: CalendarHandler) => {
    setCalendarHandlerType(type);
  }

  const getChangeTitleSuccess = (hash: string) => {
    setChangeTitleSuccess(hash);
  }

  const getLeaveParticipationSuccess = (hash: string) => {
    setLeaveParticipationEventSuccess(hash);
  }

  useEffect(() => {
    (async () => {
      setLoadingEventTitles(true);
      const data = await calendarContract.getEventTitle();
      const eventTitles: EventTitle[] = data.map((event: any) => ({
        title: event[0],
        parctitipationAmount: Number(event[1]),
        parctitipationAccount: event[2],
      }));
      setEventTitles(eventTitles);
      setLoadingEventTitles(false);
    })();
  }, [signer, changeTitleSuccess]);

  useEffect(() => {
    (async () => {
      setLoadingParticipationTitles(true);
      const data = await calendarContract.getParticipationTitle();
      const eventParticipationTitles: EventParticipationTitle[] = data.map((event: any) => ({
        title: event[0],
        calendarIndex: Number(event[1]),
        createdBy: event[2],
      }));
      setEventParticipationTitles(eventParticipationTitles);
      setLoadingParticipationTitles(false);
    })();
  }, [signer, leaveParticipationEventSuccess]);

  console.log(eventParticipationTitles)

  return (
    <>
      <div className="h-screen flex flex-col w-full mb-20 pb-20">
        <CreateTitleCelendarModal 
          showModal={showCreateEventModal}
          onCloseModal={toggleCreateEventModal}
        />
        {
          eventTitles.length > 0
          &&
          (
            <CreateEventTitleCelendarModal 
              calendarEventData={eventTitle!}
              calendarIndex={currentCalendarIndex}
              type={calendarHandlerType}
              showModal={showHandlerEventModal}
              onCloseModal={toggleCalendarHandler}
              onChangeTitleSuccess={getChangeTitleSuccess}
            />
          )
        }
        {
          (eventParticipationTitles.length > 0 && participationEventTitle)
          &&
          (
            <CalendarLeaveEventModal 
              paricipationIndex={participationEventTitle.calendarIndex} 
              participationTitle={participationEventTitle.title}
              showModal={showLeaveParticipationModal} 
              onCloseModal={toggleLeaveParticipation} 
              onLeaveParticipationSuccess={getLeaveParticipationSuccess} />
          )
        }
        <CalendarHeader />
        <div className="w-full flex flex-col p-4 gap-6">
          <div 
            className="flex flex-col p-6 border-2 border-calendar-main-theme rounded-md gap-6 shadow-lg h-[395px]"
          >
            <ConsoleEventCelendarCard>
              <h2 className="text-lg font-bold">My Calendar</h2>
              <div className="w-[200px]">
                <CreateEventButton
                  title='Create Calendar'
                  disabled={false}
                  onSubmitEvent={toggleCreateEventModal}
                />
              </div>
            </ConsoleEventCelendarCard>
            {
              isConnected
              ?
              (
                <>
                  {
                    loadingEventTitles
                    ?
                    (
                      <div className="flex w-full h-full justify-center items-center">
                        <LoadingOutlined
                          style={{
                            fontSize: 100,
                            color: '#1e293b',
                          }}
                          spin
                          rev={undefined}
                        />
                      </div>
                    )
                    :
                    (
                      <div 
                        className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-8"
                      >
                        {
                          eventTitles.map((data, index) => (
                            <EventCalendarCard
                              key={index}
                              data={data}
                              calendarIndex={index}
                              onGetCalendarHandlerType={getCalendarHandlerType}
                              onGetCurrentCalerdarData={getCurrentCalerdarData}
                              onToggleCalendarHandler={toggleCalendarHandler}
                            />
                          ))
                        }
                      </div>
                    )
                  }
                </>
              )
              :
              (
                <EmptyCalendarCard />
              )
            }
          </div>
          <div 
            className="flex flex-col p-6 border-2 border-calendar-main-theme rounded-md gap-6 shadow-lg"
          >
            <ConsoleEventCelendarCard>
              <h2 className="text-lg font-bold">Participation Calendar</h2>
            </ConsoleEventCelendarCard>
            {
              isConnected
              ?
              (
                <>
                  {
                    loadingParticipationTitles
                    ?
                    (
                      <div className="flex w-full h-full justify-center items-center">
                        <LoadingOutlined
                          style={{
                            fontSize: 100,
                            color: '#1e293b',
                          }}
                          spin
                          rev={undefined}
                        />
                      </div>
                    )
                    :
                    (
                      <div 
                        className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-8 max-h-[550px] overflow-y-auto"
                      >
                        {
                          eventParticipationTitles.map((data, index) => (
                            <ParticipationCalendarCard
                              key={index}
                              data={data}
                              onToggleLeaveParticipation={toggleLeaveParticipation}
                              onGetCurrentParticipationData={getCurrentParticipationData}
                            />
                          ))
                        }
                      </div>
                    )
                  }
                </>
              )
              :
              (
                <EmptyCalendarCard />
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default CalendarEvent;