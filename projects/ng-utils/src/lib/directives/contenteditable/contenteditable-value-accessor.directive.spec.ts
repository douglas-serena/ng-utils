import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ContenteditableModule } from './contenteditable.module';

describe(ContenteditableModule.name, () => {
  let fixture: ComponentFixture<ControlendDirectiveTestComponent>;
  let component: ControlendDirectiveTestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ContenteditableModule],
      declarations: [ControlendDirectiveTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlendDirectiveTestComponent);
    component = fixture.componentInstance;
  });

  it(`(DOM) Adicionar value via reactive form e pegando no textContent`, () => {
    const elementRef = fixture.debugElement.query(By.css('div'));
    const element: HTMLElement = elementRef.nativeElement;
    component.control?.setValue('1001');
    fixture.detectChanges();
    expect(element?.textContent).toBe('1001');
  });

  it(`(DOM) Adicionar value na div e pegando via reactive form`, () => {
    const elementRef = fixture.debugElement.query(By.css('div'));
    const element: HTMLElement = elementRef.nativeElement;
    fixture.detectChanges();
    element.textContent = '1001';
    fixture.detectChanges();
    expect(component.control?.value).toBe('1001');
  });
});

@Component({
  template: `<form [formGroup]="form">
    <div contentReactive formControlName="div"></div>
  </form>`,
})
class ControlendDirectiveTestComponent {
  form?: FormGroup = FormBuilder.prototype.group({
    div: [''],
  });

  get control() {
    return this.form?.controls.div;
  }
}
