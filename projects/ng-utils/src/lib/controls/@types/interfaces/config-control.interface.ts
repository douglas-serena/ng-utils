import { IControl } from './control.interface';

export interface IConfigControl {
  theme: string;
  control: {
    [key: string]: IControl;
  };
}
