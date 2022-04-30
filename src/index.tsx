import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {FlowProvider, useFlow} from './Flow'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Screen1 = () => {
  const {actions} = useFlow()
  return <div>
    Screen 1
    <button onClick={() => actions.nextScreen(2)}>Next</button>
  </div>
}
const Screen2 = () => <div>Screen 2</div>
const Screen3 = () => <div>Screen 3</div>

root.render(
  <React.StrictMode>
    <FlowProvider initialState={{
      sanityString: 'test',
      screens: [
        Screen1,
        Screen2,
        Screen3,
      ],
      currenScreenIndex: 0,
    }}>

      <App />
    </FlowProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
