import { createRoot } from 'react-dom/client';
import React from 'react';
import CalendarWrapper from './CalendarWrapper';
import { eventStore } from './store';

Module.register('MMM-MonthlyCalendar2', {
  renderedReact: false,
  getStyles() {
    return ['MMM-MonthlyCalendar2.css'];
  }, // On first DOM render, this will be true
  getDom() {
    const rootDiv = document.createElement('div');
    const root_id = `${this.name}-react-root`;

    rootDiv.id = root_id;
    if (!this.renderedReact) {
      this.renderedReact = true;
      const root = createRoot(rootDiv);
      root.render(React.createElement(CalendarWrapper));
    }

    return rootDiv;
  },
  transformData(_this: any, payload: any) {
    _this.sendSocketNotification('TRANSFORM_CALENDAR2_EVENTS', payload);
  },
  notificationReceived(notification, payload, sender) {
    if (notification === 'CALENDAR_EVENTS') {
      this.transformData(this, payload);
    } else if (notification === 'TRANSFORMED_CALENDAR2_EVENTS') {
      eventStore.setState({ events: payload });
    }
  },
  socketNotificationReceived(notification, payload) {
    eventStore.setState({ events: payload });
  },
});
