import { useContext, useEffect, useState } from 'react';

import ModuleContext from './contexts/module';

const CountDown = () => {
  const module: any = useContext(ModuleContext);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
    setTimeout(() => {
      setCount(count + 1);
    }, 2000);
  }, [count]);

  return <div className='gradient'>React Starter: {count}</div>;
};

export default CountDown;
