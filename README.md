# ⛵ Seafarer

🚧 **Disclaimer**: This project is in development and would love any feedback and how you wish it worked and what features to add. That being said, it is not meant for hardened production environments just yet.

One of the main purposes for this project is to make creating simple step flows easier and faster. By using intentional abstractions, the only thing a developer has to worry about is the core logic of the flow itself. You should not have to worry about keeping up with the state of the flow all the time or rewriting advance and previous screen logic. With  **Seafarer** only worry about what your flow is doing. Written with modern React **Seafarer** provides a simple hook to use throughout your application. You can only use the core logic engine of **Seafarer** or add your own screen components.

- [⛵ Seafarer](#-seafarer)
  - [Installation](#installation)
    - [NPM](#npm)
    - [Yarn](#yarn)
  - [Usage](#usage)
    - [`<FlowProvider/>`](#flowprovider)
    - [Flow Config](#flow-config)
      - [Flow Settings](#flow-settings)
      - [Example Config](#example-config)
    - [Screens](#screens)
      - [Screen Settings](#screen-settings)
        - [Screen Input Types](#screen-input-types)
    - [`UseFlow()`](#useflow)
  - [Contributing](#contributing)
  - [Project](#project)

## Installation

### NPM

```bash
npm install --save seafarer
```

### Yarn

```bash
yarn add seafarer
```

## Usage

### `<FlowProvider/>`

Comes with a `<FlowProvider/>` to wrap the parent component where you want to use the flow.

```tsx
    <FlowProvider initialState={{
    /* Flow Config Data */
    }}>
      <App />
    </FlowProvider>
```

### Flow Config

When a initializing a flow, there are several options available to you.

```typescript
export interface FlowConfig {
  startIndex: number;
  screens: Screen[];
  settings?: FlowSettings;
  data?: FlowData
  onSubmit?: (data?: FlowData, state?: State) => void
  onNext?: (data?: FlowData, state?: State) => void
  onPrevious?: (data?: FlowData, state?: State) => void
  onSave?: (data?: FlowData, state?: State) => void
}
```

| Property | Required | Default | Description |
| -- | -- | -- |-- |
| `startIndex` | `true` | `0` | The start index of the screen in the screens array |
| `screens` | `true` | `[]` | An Array of screen objects |
| `settings` | `false` | see [settings](#flow-settings) section | flow settings |
| `data` | `false` | - | Any flow data you want the flow to initialize with|
| `onSubmit(data, state)` | `false` | - | Hook to do an action on a submit of the flow|
| `onNext(data, state)` | `false` | - | Hook to do an action on a next action of the flow|
| `onPrevious(data, state)` | `false` | - | Hook to do an action on a previous action of the flow|
| `onSave(data, state)` | `false` | - | Hook to do an action on a save action of the flow|

#### Flow Settings

| Property | Required | Default | Description |
| -- | -- | -- |-- |
|`verbose` | 'false' | `false` | Provide extra console output base for screen actions |
|`strictValidation` | 'true' | `false` | A screen must have a `isValid` set to `true` for the flow to advance |

#### Example Config

```typescript
import { ScreenTypes } from 'flow'

const flowConfig = {

      settings: {
        strictValidation: true,
        verbose: true,
      },
      screens: [
        {
          validate(data) {
            console.log('...Validating', data);
            return data?.foo === 'bar';
          },
          name: 'screen-1',
          type: ScreenTypes.INPUT
        },
        {
          name: 'screen-2',
          type: ScreenTypes.INPUT,
          shouldSkip(data) {
            return data?.foo === 'bar';
          },
          isValid: true,

        },
        {
          name: 'screen-3',
          component: Screen3,
          type: ScreenTypes.INPUT,
          isValid: true
        },

      ],
      startScreenIndex: 0,
      onSubmit(data, state) {
        console.log('submit', { data, state });
      },
}

```

### Screens

This library uses the concept of a `Screen` as its main taxonomy. At the core it things in terms or what screen should I should and in what order.

#### Screen Settings

```ts
export interface Screen {
  name: string;
  type: ScreenTypes;
  component?: FC;
  data?: {
    [key: string]: unknown;
  }
  isValid?: boolean;
  isDirty?: boolean;
  shouldSkip?: (data?: FlowData, state?: State) => boolean;
  validate?: (data?: FlowData) => boolean;

}
```

| Property | Type | Required | Description |
|-- |-- |-- |-- |
| `name` | `string` | `true` | This the name of your screen. |
| `type` | `enum` | `true` | See [Screen Input Types](#screen-input-types) |
| `component` | `React.FC` | `false` | If you wanted to pass a component to be rendered. |
| `data` | `object` | `false` | If you wanted to have data for this screen. For example lets say you wanted to add a `source` or `broswer`  field where the flow is running, you could add that here.
|`isValid` | `boolean` | `false` | Is this screen valid. This setting can be updated programmatically as inputs or the state of the flow changes. |
| `isDirty` | `boolean` | `false` | Has a user put input into this screen |
`shouldSkip` | `function` | `false` | Runs logic to determine if this screen should be skipped. This function is run whenever a form navigation event is running like a `NEXT_SCREEN` or `PREVIOUS_SCREEN` |
`validate` | `function` | `false` | This will run if you have `strictValidation` set to true in the flow settings and will run _before_ a `NEXT_SCREEN` action.


##### Screen Input Types

```ts
export enum ScreenTypes {
  INPUT = 'INPUT', // AN Input Screen
  LOADING = 'LOADING', // A Loading or interstitial screen
  SUBMIT = 'SUBMIT', // A submit screen
  DISPLAY = 'DISPLAY', // Only an informational screen
}
```

### `UseFlow()`

```tsx
import { useFlow } from 'TO BE NAME LATER)';

function App() {

  const { flowState, flowActions } = useFlow();
  const currentScreen = flowState.screens[state.currenScreenIndex];

  return (
    <div className="App">
      <div>HEllow WOrld</div>

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
```

## Contributing


## Project

[Github Project](https://github.com/users/ptallen63/projects/2/views/1?groupedBy%5BcolumnId%5D=4138946&visibleFields=%5B%22Title%22%2C%22Status%22%2C4139073%2C%22Linked+Pull+Requests%22%5D)