import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { FlowProvider, ScreenTypes } from '.';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

//Test Screen components
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const Screen1 = (props) => <div> Screen 1 {props.name} <pre>{JSON.stringify(props, null, 2)}</pre> </div>;
const Screen2 = () => <div>Screen 2</div>;
const Screen3 = () => <div>Screen 3</div>;

root.render(
  <React.StrictMode>
    <FlowProvider config={{
      data: {
        bar: 'baz',
      },
      settings: {
        strictValidation: true,
        verbose: true,
        enableDevTools: true,
      },
      screens: [
        {
          validate(data) {
            console.log('...Validating', data);
            return data?.foo === 'bar';
          },
          name: 'screen-1', component: Screen1, type: ScreenTypes.INPUT },
        {
          name: 'screen-2',
          component: Screen2, type: ScreenTypes.INPUT,
          shouldSkip(data) {
            if (data?.foo === 'bar') return true;
            return false;
          },
          isValid: true,

        },
        { name: 'screen-3', component: Screen3, type: ScreenTypes.INPUT, isValid: true },

      ],
      onSubmit(data, state) {
        console.log('submit', { data, state });
      },
    }}>

      <App />
    </FlowProvider>
  </React.StrictMode>,
);
