import React from 'react';

import {useFlow} from '.'

function App() {

  const { state, actions } = useFlow();
  const currentScreen = state.screens[state.currenScreenIndex];
  const CurrentScreenComponent = currentScreen.component
  console.log({state, actions})

  return (
    <div className="App">
      <div>HEllow WOrld</div>
      {/* <CurrentScreenComponent/> */}
      <pre>
        {JSON.stringify(currentScreen, null, 2)}
      </pre>
      <button onClick={() => actions.previousScreen()}>Prev</button>
      <button onClick={() => {
        actions.validateScreen( currentScreen, { foo: 'bar' })
        actions.saveAndContinue({ foo: 'bar' });
        return
      }}>Next</button>
      <button onClick={() => actions.submit()}>Submit</button>

    </div>
  );
}

export default App;
