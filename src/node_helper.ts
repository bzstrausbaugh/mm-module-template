import dayjs from 'dayjs';
import * as NodeHelper from 'node_helper';
import { trim } from 'radash';

module.exports = NodeHelper.create({
  colors: [
    'blue',
    'cyan',
    'grape',
    'indigo',
    'lime',
    'orange',
    'pink',
    'red',
    'teal',
    'violet',
  ],

  getHashCode: function (str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  },

  getColorFromHash: function (str: string) {
    const hash = this.getHashCode(str);
    return this.colors[hash % this.colors.length];
  },

  start: function () {
    console.log('Starting node_helper for: MMM-Calendar2');
  },

  socketNotificationReceived: function (
    notification: string,
    payload: unknown,
  ) {
    var _this = this;
    if (notification === 'TRANSFORM_CALENDAR2_EVENTS') {
      if (!Array.isArray(payload)) {
        return;
      }
      const transformed = payload.map((event, index) => {
        const mappedEvent = {
          id: `evt-${index}`,
          title: trim(event.title),
          start: dayjs(parseInt(event.startDate)).toDate(),
          end: dayjs(parseInt(event.endDate)).toDate(),
          color: this.getColorFromHash(trim(event.title)),
          allDay: event.fullDayEvent,
        };
        return mappedEvent;
      });
      _this.sendSocketNotification('TRANSFORMED_CALENDAR2_EVENTS', transformed);
    }
  },
});
