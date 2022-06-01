import { FlowData } from '../store/flowStore';
import { State } from '../../types/State';

export enum ScreenTypes {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  SUBMIT = 'SUBMIT',
  DISPLAY = 'DISPLAY',
}

export type ScreenComp = React.FC<Screen>;

export interface IScreen {
  name: string;
  type: ScreenTypes;
  component?: ScreenComp;
  data?: {
    [key: string]: unknown;
  }
  isValid?: boolean;
  isDirty?: boolean;
  shouldSkip?: (data?: FlowData, state?: State) => boolean;
  validate?: (data?: FlowData) => boolean;

}


export class Screen {
  name: string;

  type: ScreenTypes;

  component?: ScreenComp | undefined;

  shouldSkip?: (data?: FlowData, state?: State) => boolean;

  validate?: (data: FlowData) => boolean;

  isValid?: boolean;

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

  private withProps(WrappedScreenComp: ScreenComp | undefined) {
    if (!WrappedScreenComp) return;

    WrappedScreenComp.defaultProps = this.settings;

    return WrappedScreenComp;
  }
}