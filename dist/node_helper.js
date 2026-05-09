(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('dayjs'), require('node_helper'), require('radash')) :
    typeof define === 'function' && define.amd ? define(['dayjs', 'node_helper', 'radash'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.dayjs, global.NodeHelper, global.radash));
})(this, (function (dayjs, NodeHelper, radash) { 'use strict';

    function _interopNamespaceDefault(e) {
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n.default = e;
        return Object.freeze(n);
    }

    var NodeHelper__namespace = /*#__PURE__*/_interopNamespaceDefault(NodeHelper);

    module.exports = NodeHelper__namespace.create({
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
        getHashCode: function (str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }
            return Math.abs(hash);
        },
        getColorFromHash: function (str) {
            const hash = this.getHashCode(str);
            return this.colors[hash % this.colors.length];
        },
        start: function () {
            console.log('Starting node_helper for: MMM-Calendar2');
        },
        socketNotificationReceived: function (notification, payload) {
            var _this = this;
            if (notification === 'TRANSFORM_CALENDAR2_EVENTS') {
                if (!Array.isArray(payload)) {
                    return;
                }
                const transformed = payload.map((event, index) => {
                    const mappedEvent = {
                        id: `evt-${index}`,
                        title: radash.trim(event.title),
                        start: dayjs(parseInt(event.startDate)).toDate(),
                        end: dayjs(parseInt(event.endDate)).toDate(),
                        color: this.getColorFromHash(radash.trim(event.title)),
                        allDay: event.fullDayEvent,
                    };
                    return mappedEvent;
                });
                _this.sendSocketNotification('TRANSFORMED_CALENDAR2_EVENTS', transformed);
            }
        },
    });

}));
