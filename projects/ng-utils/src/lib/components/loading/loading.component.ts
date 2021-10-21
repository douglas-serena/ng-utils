import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[ngLoading]',
  templateUrl: './loading.component.html',
  host: {
    '[disabled]': 'ngLoading',
    '[class.ng-loading]': 'ngLoading',
  },
})
export class LoadingComponent implements OnInit {
  @Input() public ngLoading = false;
  @Input() public ngHiddenContent = true;
  @Input() public ngType: null | string = null;

  constructor() {}

  ngOnInit() {}
}
