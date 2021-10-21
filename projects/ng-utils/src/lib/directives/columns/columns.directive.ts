import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { configuration } from '../../configuration/public-api';
import { IConfigColumns } from '../@types/interfaces/config-columns.interface';

@Directive({
  selector: '[columns]',
})
export class ColumnsDirective implements OnInit {
  _element!: HTMLElement;
  _columns: IConfigColumns = {
    addColumnHost: false,
    addRowHost: true,
    default: 12,
  };

  @Input() columnType!: 'bootstrap' | 'materialize';
  @Input() set columns(columns: IConfigColumns | string) {
    if (!(typeof columns === 'string')) {
      Object.assign(this._columns, columns);
      if (this._element) {
        this.updateColumns();
      }
    }
  }

  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  ngOnInit() {
    this._element = this.elementRef.nativeElement;
    this.columnType = this.columnType || configuration.columnType;

    this.updateColumns();
  }

  updateColumns() {
    let elementRoot = this._element;
    let elementAddColumns = elementRoot;
    let elementHost = elementRoot.parentElement;

    // ADD COLUMNS ELEMENT HOST
    if (this._columns.addColumnHost) {
      if (elementHost) {
        elementAddColumns = elementHost;
      }
    }

    if (elementHost?.isEqualNode(elementAddColumns)) {
      elementHost = elementAddColumns.parentElement;
    }

    // ADD ROW ELEMENT HOST
    if (this._columns.addRowHost) {
      if (elementHost && !elementHost.classList.contains('row')) {
        elementHost.classList.add('row');
      }
    }

    if (elementHost?.classList.contains('row')) {
      if (this.columnType === 'materialize') {
        elementAddColumns.classList.add('col');
        // WIDTH Mobile Devices <= 600px
        if (this._columns.sm) {
          elementAddColumns.classList.add(`s${this._columns.sm}`);
        } else {
          elementAddColumns.classList.add(`s${this._columns.default}`);
        }

        // WIDTH Tablet Devices > 600px
        if (this._columns.md) {
          elementAddColumns.classList.add(`m${this._columns.md}`);
        }

        // WIDTH Desktop Devices > 992px
        if (this._columns.lg) {
          elementAddColumns.classList.add(`l${this._columns.lg}`);
        }

        // WIDTH Large Desktop Devices > 1200px
        if (this._columns.xl) {
          elementAddColumns.classList.add(`xl${this._columns.xl}`);
        }
      } else if (this.columnType === 'bootstrap') {
        // WIDTH Extra small < 576px
        if (this._columns.default) {
          elementAddColumns.classList.add(`col-${this._columns.default}`);
        }

        // WIDTH Small ≥ 576px
        if (this._columns.sm) {
          elementAddColumns.classList.add(`col-sm-${this._columns.sm}`);
        }

        // WIDTH Medium ≥ 768px
        if (this._columns.md) {
          elementAddColumns.classList.add(`col-md-${this._columns.md}`);
        }

        // WIDTH Large ≥ 992px
        if (this._columns.lg) {
          elementAddColumns.classList.add(`col-lg-${this._columns.lg}`);
        }

        // WIDTH Extra large ≥ 1200px
        if (this._columns.xl) {
          elementAddColumns.classList.add(`col-xl-${this._columns.xl}`);
        }
      }
    }
  }
}
