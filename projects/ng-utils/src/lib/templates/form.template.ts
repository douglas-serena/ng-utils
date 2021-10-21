import { IConfigForm } from './@types/interfaces/form.interface';
import { BaseTemplate } from './base.template';

export class FormTemplate extends BaseTemplate<IConfigForm> {
  constructor(config?: IConfigForm) {
    super(config);
  }
}
