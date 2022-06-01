import { FlowData } from '../store/flowStore';
import { State } from '../../types/State';

export enum ScreenTypes {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  SUBMIT = 'SUBMIT',
  DISPLAY = 'DISPLAY',
}

export type ScreenComponent = React.FC<Screen>;

export interface IScreen {
  name: string;
  type: ScreenTypes;
  component?: ScreenComponent;
  data?: {
    [key: string]: unknown;
  }
  isValid?: boolean;
  isDirty?: boolean;
  shouldSkip?: (data?: FlowData, state?: State) => boolean;
  validate?: (data?: FlowData) => boolean;

}


export class Screen {
  // Actual name of the screen ex: screen-1
  name: string;

  // Not really logic right now, but is an enum
  type: ScreenTypes;

  // Actual screen component used if you wanted to render a component
  component?: ScreenComponent | undefined;

  // A function that says if you should skip that screen and go to the next
  shouldSkip?: (data?: FlowData, state?: State) => boolean;

  /// A function that will run if you wanted to have validate logic run against the screen
  validate?: (data: FlowData) => boolean;

  // a property to see if the screen is good or not
  isValid?: boolean;

  // a property to see if the screen as been touched
  isDirty?: boolean;

  constructor(private settings: IScreen) {
    this.name = settings.name;
    this.type = settings.type;
    this.shouldSkip = settings.shouldSkip;
    this.isValid = settings.isValid;
    this.isDirty = settings.isDirty;
    this.validate = settings.validate;
    this.component = this.withProps(settings.component);
  }

  /**
   * Takes in a component and add the screen settings as props to it.
   * @param WrappedScreenComp the
   * @returns
   */
  private withProps(WrappedScreenComp: ScreenComponent | undefined) {
    if (!WrappedScreenComp) return;

    WrappedScreenComp.defaultProps = this.settings;

    return WrappedScreenComp;
  }
}