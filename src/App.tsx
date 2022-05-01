import React from 'react';

import {useFlow} from './Flow'

function App() {

  const { state, actions } = useFlow();
  const CurrentScreenComponent = state.screens[state.currenScreenIndex].component
  console.log({state, actions})

  return (
    <div className="App">
      <div>HEllow WOrld</div>
      <CurrentScreenComponent/>
      <button onClick={() => {
        actions.saveAndContinue({ foo: 'bar' });
        return
      }}>Next</button>
      <button onClick={actions.previousScreen}>Prev</button>
    </div>
  );
}

export default App;
