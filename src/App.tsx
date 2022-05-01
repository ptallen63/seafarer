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
    </div>
  );
}

export default App;
