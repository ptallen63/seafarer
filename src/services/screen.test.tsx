import { IScreen, Screen, ScreenComponent, ScreenTypes } from './screen';

// const Screen1: ScreenComponent = () => <div>Screen-1</div>;
const screenSettings: IScreen = {
  name: 'screen-1',
  data: {
    foo: 'bar',
  },
//   component: Screen1,
  type: ScreenTypes.INPUT,
  validate: (data) => data?.foo === 'bar',
  shouldSkip: (data) => data?.foo === 'baz',
};


describe('Screen class initializes', () => {
  const screen = new Screen(screenSettings);
  it('should have base valid Properties', () => {
    expect(screen.name).toBe('screen-1');
    expect(screen.type).toBe('INPUT');
    expect(screen.isValid).toBe(true);
    expect(screen.isDirty).toBe(false);
  });

  it('should have functions', () => {
    expect(screen.shouldSkip).toBeDefined();
    expect(typeof screen.shouldSkip).toBe('function');
    expect(screen.validate).toBeDefined();
    expect(typeof screen.validate).toBe('function');
  });

});

// TODO
describe('Screen should add props to component', () => {});

describe('should call the validate function properly', () => {
  const screen = new Screen(screenSettings);
  it('should return true validation', () => {
    expect(screen.validate(screen.data)).toBe(true);
  });

  it('dont validate if the data is not correct to the function', () => {
    const badScreen = new Screen({ ...screenSettings, data: { foo: 'baz' } });
    expect(badScreen.validate(badScreen.data)).toBe(false);
  });
});

describe('should call the shouldSkip function properly', () => {
  const screen = new Screen(screenSettings);
  it('should return true validation', () => {
    expect(screen.shouldSkip(screen.data)).toBe(false);
  });

  it('dont validate if the data is not correct to the function', () => {
    const goodScreen = new Screen({ ...screenSettings, data: { foo: 'baz' } });
      expect(goodScreen.shouldSkip(goodScreen.data)).toBe(true);
  });
});
