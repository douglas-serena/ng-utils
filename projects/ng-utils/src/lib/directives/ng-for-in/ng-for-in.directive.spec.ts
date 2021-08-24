import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForInModule } from './ng-for-in.module';

describe(NgForInModule.name, () => {
  let fixture: ComponentFixture<NgForInDirectiveTestComponent>;
  let component: NgForInDirectiveTestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgForInModule],
      declarations: [NgForInDirectiveTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgForInDirectiveTestComponent);
    component = fixture.componentInstance;
  });

  it(`(DOM) Renderizar as keys de um objeto de pessoa`, () => {
    component.object = {
      name: 'Douglas Serena',
      age: 20,
      cpf: '000.000.000-00',
    };
    fixture.detectChanges();
    const elementRef = fixture.debugElement.query(By.css('ul'));
    const lis: HTMLLIElement[] = elementRef
      .queryAll(By.css('li'))
      .map((element) => element.nativeElement);
    Object.keys(component.object).forEach((key, index) => {
      expect(lis[index].textContent?.trim()).toBe(key);
    });
  });
});

@Component({
  template: ` <ul>
    <li *ngFor="let key; in: object">{{ key }}</li>
  </ul>`,
})
class NgForInDirectiveTestComponent {
  @Input() object?: { [key: string]: any };
}
