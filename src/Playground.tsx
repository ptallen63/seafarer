import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { FlowProvider, ScreenTypes, ScreenComponent } from '.';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

//Test Screen components
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const ScreenComp1 :ScreenComponent = (props) => {
  console.log({ props });
  return (
  <div>
    {props.meta.header}
    <pre>
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>
  );
};
const ScreenComp2 :ScreenComponent = (props) => {
  console.log({ props });
  return (
  <div>
    {props.meta.header}
    <pre>
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>
  );
};

const ScreenComp3 :ScreenComponent = (props) => {
  console.log({ props });
  return (
  <div>
    {props.meta.header}
    <pre>
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>
  );
};

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
          name: 'screen-1',
          component: ScreenComp1,
          type: ScreenTypes.INPUT,
          meta: {
            header: 'Screen 1',
          } },
        {
          name: 'screen-2',
          component: ScreenComp2,
          type: ScreenTypes.INPUT,
          shouldSkip(data) {
            if (data?.foo === 'bar') return true;
            return false;
          },
          isValid: true,
          meta: {
            header: 'Screen 2',
          },
        },
        {
          name: 'screen-3',
          component: ScreenComp3,
          type: ScreenTypes.INPUT,
          isValid: true,
          meta: {
            header: 'Screen 3',
          },
        },

      ],
      onSubmit(data, state) {
        console.log('submit', { data, state });
      },
    }}>

      <App />
    </FlowProvider>
  </React.StrictMode>,
);
