import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { AddItemComponent } from './add-item.component';

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    component.loadedGrocerItems = [
      {
        "grocery_id": 1,
        "name": "Bananas"
      },
      {
        "grocery_id": 2,
        "name": "Wheat Bread"
      }
    ]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return true on duplicate item', () => {
    let controlToTest = new FormControl('Bananas')
    expect(component.isDuplicate(controlToTest)).toEqual({'addedDuplicateItem': true});
  });
  it('should return false if not duplicate item', () => {
    let controlToTest = new FormControl('Milk')
    expect(component.isDuplicate(controlToTest)).not.toEqual({'addedDuplicateItem': true});
  });
  it('should emit addItem event if the form field is valid on add button click', () => {

    spyOn(component.addItemEvent, 'emit');

    component.addItemField.controls.newItem.setValue('Water');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.addItemEvent.emit).toHaveBeenCalled();
  });
  it('should not emit addItem event if the form field is valid on add button click', () => {

    spyOn(component.addItemEvent, 'emit');

    component.addItemField.controls.newItem.setValue('');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.addItemEvent.emit).not.toHaveBeenCalled();
  });
});
