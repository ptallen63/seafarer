import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {FlowProvider, ScreenTypes} from './Flow'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Screen1 = () => {
  return <div>
    Screen 1

  </div>
}
const Screen2 = () => <div>Screen 2</div>
const Screen3 = () => <div>Screen 3</div>

root.render(
  <React.StrictMode>
    <FlowProvider initialState={{
      data: {
        bar: 'baz',
      },
      sanityString: 'test',
      screens: [
        { name: 'screen-1', component: Screen1, type: ScreenTypes.INPUT },
        { name: 'screen-2', component: Screen2, type: ScreenTypes.INPUT, shouldSkip(data, state) {
          console.log('SKIPPING', data, state)
          if (data?.['foo'] === 'bar') return true;
          return false;
        } },
        { name: 'screen-3', component: Screen3, type: ScreenTypes.INPUT },

      ],
      currenScreenIndex: 0,
      onSubmit(data, state){
        console.log('submit', {data, state})
      }
    }}>

      <App />
    </FlowProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
