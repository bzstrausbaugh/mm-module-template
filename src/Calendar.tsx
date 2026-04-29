import { useEffect, useState } from 'react';

import {
  DateStringValue,
  MonthView,
  ScheduleEventData,
  ScheduleHeader,
} from '@mantine/schedule';
import { Box, Flex, Group, HoverCard, UnstyledButton } from '@mantine/core';
import dayjs from 'dayjs';
import { useStore } from 'zustand';
import { eventStore } from './store';
import { EventDetails } from './EventDetails';

const Calendar = () => {
  const events: any = useStore(eventStore, (state: any) => {
    const events = state.events;
    return events;
  });
  const [date, setDate] = useState<DateStringValue>(
    dayjs().format('YYYY-MM-DD'),
  );

  return (
    <>
      <ScheduleHeader styles={{ header: { justifyContent: 'center' } }}>
        <ScheduleHeader.Previous
          onClick={() =>
            setDate(
              dayjs(date)
                .subtract(1, 'month')
                .startOf('month')
                .format('YYYY-MM-DD') as DateStringValue,
            )
          }
        />
        <ScheduleHeader.MonthYearSelect
          yearValue={dayjs(date).year()}
          monthValue={dayjs(date).month()}
          onYearChange={(year) =>
            setDate(
              dayjs(date)
                .year(year)
                .startOf('month')
                .format('YYYY-MM-DD') as DateStringValue,
            )
          }
          onMonthChange={(month) =>
            setDate(
              dayjs(date)
                .month(month)
                .startOf('month')
                .format('YYYY-MM-DD') as DateStringValue,
            )
          }
        />
        <ScheduleHeader.Next
          onClick={() =>
            setDate(
              dayjs(date)
                .add(1, 'month')
                .startOf('month')
                .format('YYYY-MM-DD') as DateStringValue,
            )
          }
        />
        <ScheduleHeader.Today
          onClick={() =>
            setDate(dayjs().format('YYYY-MM-DD') as DateStringValue)
          }
        />
      </ScheduleHeader>
      <MonthView
        date={date}
        events={events}
        withHeader={false}
        firstDayOfWeek={0}
        renderEvent={(event, props) => (
          <HoverCard
            width={280}
            position='right'
            closeDelay={0}
            transitionProps={{ duration: 0 }}
          >
            <HoverCard.Target>
              <UnstyledButton {...props} />
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <EventDetails event={event} />
            </HoverCard.Dropdown>
          </HoverCard>
        )}
      />
    </>
  );
};

export default Calendar;
