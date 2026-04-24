import ModuleContext from './contexts/module';
import CountDown from './CountDown';

const CountDownWrapper = (module: any) => {
  return (
    <ModuleContext.Provider value={module}>
      <CountDown />
    </ModuleContext.Provider>
  );
};

export default CountDownWrapper;
