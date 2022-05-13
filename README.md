# Flow (To Be named Later)

One of the main purposes for this project is to make creating simple step flows easier and faster. By using intentional abstractions, the only thing a developer has to worry about is the core logic of the flow itself. You should not have to worry about keeping up with the state of the flow all the time or rewriting advance and previous screen logic. With <<INSTER NAME>> only worry about what your flow is doing. Written with modern React <<INSERT NAME>> provides a simple hook to use throughout your application. You can only use the core logic engine of <<INSERT NAME>> or add your own screen components.

## Installation

<!-- TODO: Add installation instruction -->

## Usage

### Provider
Comes with a `Provider` to be wrapped the parent component where you want to use the app

```tsx
    <FlowProvider initialState={{
    /* Flow Config Data */
    }}>
      <App />
    </FlowProvider>
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

## Project
[Github Project](https://github.com/users/ptallen63/projects/2/views/1?groupedBy%5BcolumnId%5D=4138946&visibleFields=%5B%22Title%22%2C%22Status%22%2C4139073%2C%22Linked+Pull+Requests%22%5D)