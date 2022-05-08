## Flow (To Be named Later)

## TODO
- [x] Implement screen validations
- [x] Create Build
- [x] Create Release
- [ ] support semantic release
- [ ] Create Tests
- [ ] [Publish to NPM](https://github.com/actions/setup-node/blob/main/docs/advanced-usage.md#publish-to-npmjs-and-gpr-with-npm)
- [ ] Figure out the best deliver mechanism for the client
- [x] implement strict validation
- [x] implement verbose flag
- [x] implement previous screen history
- [ ] implement pulling data props from screen component
- [ ] Implement intefaces v types where possible
- [ ] write documentation
- [ ] Clean up Dev
- [x] Setup Huskey
- [ ] Set up a create-release action
- [x] Linting actions
- [ ] remove the CRA cruft
- [ ] Add contributing doc

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