import { FlowData } from '../store/flowStore';
import { State } from '../../types/State';

export enum ScreenTypes {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  SUBMIT = 'SUBMIT',
  DISPLAY = 'DISPLAY',
}

export type ScreenComponent = React.FC<Screen>;

export interface ScreenSettings {
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
  meta?: {
    [key: string]: unknown;
  }
}

export type ScreenMetadata = {
  [key: string]: any;
};


export class Screen {
  // Actual name of the screen ex: screen-1
  private _name: string;

  // Not really logic right now, but is an enum
  private _type: ScreenTypes;

  // Actual screen component used if you wanted to render a component
  private _component?: ScreenComponent | undefined;

  // A function that says if you should skip that screen and go to the next
  private _shouldSkip?: (data?: FlowData, state?: State) => boolean;

  /// A function that will run if you wanted to have validate logic run against the screen
  private _validate?: (data: FlowData) => boolean;

  // a property to see if the screen is good or not
  private _isValid: boolean;

  // a property to see if the screen as been touched
  private _isDirty: boolean;

  // Flow Data
  private _data: FlowData;

  // custom Metadata for screens
  private _meta: ScreenMetadata;

  constructor(private settings: ScreenSettings) {
    this._name = settings.name;
    this._type = settings.type;
    this._shouldSkip = settings.shouldSkip;
    this._isValid = settings.isValid || true;
    this._isDirty = settings.isDirty || false;
    this._validate = settings.validate;
    this._component = this.withProps(settings.component);
    this._data = settings.data || {};
    this._meta = settings.meta || {};
  }

  public get name() {
    return this._name;
  }

  public get type() {
    return this._type;
  }

  public get isValid() {
    return this._isValid;
  }

  public set isValid(val: boolean) {
    if (!val) {
      throw Error('Invalid value from IsValid');
    }
    this._isValid = val;
  }

  public get isDirty() {
    return this._isDirty;
  }

  public set isDirty(val: boolean) {
    this._isDirty = val;
  }

  public get data() {
    return this._data;
  }

  public get component() {
    return this._component;
  }

  public get validate() {
    return this._validate;
  }

  public get shouldSkip() {
    return this._shouldSkip;
  }

  public get meta() {
    return this._meta;
  }

  /**
   * Takes in a component and add the screen settings as props to it.
   * @param WrappedScreenComp the
   * @returns
   */
  private withProps(WrappedScreenComp: ScreenComponent | undefined) {
    if (!WrappedScreenComp) return;
    // Make a quick copy since they done need the component setting
    const newObj = { ...this.settings };
    delete newObj.component;
    WrappedScreenComp.defaultProps = newObj;

    return WrappedScreenComp;
  }
}