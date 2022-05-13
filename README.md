# Flow (To Be named Later)

One of the main purposes for this project is to make creating simple step flows easier and faster. By using intentional abstractions, the only thing a developer has to worry about is the core logic of the flow itself. You should not have to worry about keeping up with the state of the flow all the time or rewriting advance and previous screen logic. With <<INSTER NAME>> only worry about what your flow is doing. Written with modern React <<INSERT NAME>> provides a simple hook to use throughout your application. You can only use the core logic engine of <<INSERT NAME>> or add your own screen components.

## Installation

<!-- TODO: Add installation instruction -->

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

When a intializing a flow, there are several options available to you.

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

## Screens

### Screen Settings

#### Screen Input Types

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