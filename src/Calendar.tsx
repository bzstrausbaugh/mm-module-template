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
        moreEventsProps={{
          renderEventBody: (event: any) => {
            if (event.allDay) {
              return (
                <UnstyledButton>
                  {' '}
                  <span
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {event.title}
                  </span>
                </UnstyledButton>
              );
            }

            return (
              <UnstyledButton
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 10,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  pointerEvents: 'all',
                  cursor: 'none',
                  paddingInline: 2,
                }}
              >
                <Box
                  component='span'
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: `var(--event-bg)`,
                    flexShrink: 0,
                  }}
                />
                <span style={{ width: 28, flexShrink: 0 }}>
                  {dayjs(event.start).format('h:mm')}
                </span>
                <span
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {event.title}
                </span>
              </UnstyledButton>
            );
          },
        }}
        renderEvent={(event: any, props) => {
          if (event.allDay) {
            return <UnstyledButton {...props} />;
          }

          const { children, className, style, ...others } = props;
          return (
            <UnstyledButton
              {...others}
              style={{
                ...style,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 10,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                pointerEvents: 'all',
                cursor: 'none',
                paddingInline: 2,
              }}
            >
              <Box
                component='span'
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: `var(--event-bg)`,
                  flexShrink: 0,
                }}
              />
              <span style={{ width: 28, flexShrink: 0 }}>
                {dayjs(event.start).format('h:mm')}
              </span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {event.title}
              </span>
            </UnstyledButton>
          );
        }}
      />
    </>
  );
};

export default Calendar;
