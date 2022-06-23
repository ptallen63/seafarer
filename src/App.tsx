import React from 'react';

import { useFlow } from '.';
import './style.css';

function App() {

  const { flowState, flowActions } = useFlow();
  const currentScreen = flowState.screens[flowState.currentScreenIndex];
  const CurrentScreen = currentScreen.component as React.ElementType;
  return (
    <div className="App">
      <h1>Seafarer</h1>

      <div className="flow">
        <CurrentScreen />
      </div>

      <button onClick={() => flowActions.previousScreen()}>Previous</button>
      <button
        onClick={() => {
          flowActions.validateScreen(currentScreen, { foo: 'bar' });
          flowActions.saveAndContinue({ foo: 'bar' });
          return;
        }}
      >
        Next
      </button>
      <button onClick={() => flowActions.submit()}>Submit</button>
      <div>
        <h3>Flow data</h3>
        <pre>{JSON.stringify(flowState.data, null, 2)}</pre>
      </div>
      <div>
        <h3>Available Flow Actions</h3>
        <pre>{JSON.stringify(Object.keys(flowActions), null, 2)}</pre>
      </div>
      <div>
        <h3>Flow State</h3>
        <pre>{JSON.stringify(flowState, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
