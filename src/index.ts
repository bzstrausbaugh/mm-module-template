import { createRoot } from 'react-dom/client';
import CountDownWrapper from './CountDownWrapper';
import React from 'react';

Module.register('MMM-CountDown', {
  renderedReact: false, // On first DOM render, this will be true
  getDom() {
    const rootDiv = document.createElement('div');
    const root_id = `${this.name}-react-root`;

    rootDiv.id = root_id;
    rootDiv.innerText = 'React...';

    if (!this.renderedReact) {
      this.renderedReact = true;
      const root = createRoot(rootDiv);
      root.render(React.createElement(CountDownWrapper, { module: this }));
    }

    return rootDiv;
  },
});
