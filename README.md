## Flow (To Be named Later)
## Installation
<!-- TODO: Add installation instruction -->

## Usuage
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

  const { state, actions } = useFlow();
  const currentScreen = state.screens[state.currenScreenIndex];

  return (
    <div className="App">
      <div>HEllow WOrld</div>

      <pre>
        {JSON.stringify(currentScreen, null, 2)}
      </pre>
      <button onClick={() => actions.previousScreen()}>Prev</button>
      <button onClick={() => {
        actions.validateScreen( currentScreen, { foo: 'bar' });
        actions.saveAndContinue({ foo: 'bar' });
        return;
      }}>Next</button>
      <button onClick={() => actions.submit()}>Submit</button>

    </div>
  );
}
```

## Project
[Github Project](https://github.com/users/ptallen63/projects/2/views/1?groupedBy%5BcolumnId%5D=4138946&visibleFields=%5B%22Title%22%2C%22Status%22%2C4139073%2C%22Linked+Pull+Requests%22%5D)