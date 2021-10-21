import { IConfigList } from './@types/interfaces/list.interface';
import { BaseTemplate } from './base.template';

export class ListTemplate extends BaseTemplate<IConfigList> {
  constructor(config?: IConfigList) {
    super(config);
  }
}
