import React from 'react';

import { useFlow } from '.';

function App() {

  const { flowState, flowActions } = useFlow();
  const currentScreen = flowState.screens[flowState.currentScreenIndex];
  // const CurrentScreenComponent = currentScreen.component;

  return (
    <div className="App">
      <div>HEllow WOrld</div>
      {/* <CurrentScreenComponent/> */}
      <pre>
        {JSON.stringify(currentScreen, null, 2)}
      </pre>
      <button onClick={() => flowActions.previousScreen()}>Prev</button>
      <button onClick={() => {
        flowActions.validateScreen( currentScreen, { foo: 'bar' });
        flowActions.saveAndContinue({ foo: 'bar' });
        return;
      }}>Next</button>
      <button onClick={() => flowActions.submit()}>Submit</button>

    </div>
  );
}

export default App;
