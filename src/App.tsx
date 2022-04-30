import React from 'react';

import {useFlow} from './Flow'

function App() {

  const { state, actions } = useFlow();
  const CurrentScreen = state.screens[state.currenScreenIndex]
  console.log({state, actions})

  return (
    <div className="App">
      <div>HEllow WOrld</div>
      <CurrentScreen/>
    </div>
  );
}

export default App;
