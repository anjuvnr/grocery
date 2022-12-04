import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayItemComponent } from './display-item.component';

describe('DisplayItemComponent', () => {
  let component: DisplayItemComponent;
  let fixture: ComponentFixture<DisplayItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayItemComponent);
    component = fixture.componentInstance;
    component.groceryItem =       {
      "grocery_id": 1,
      "name": "Juice"
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit deleteItem event on clicking delete button', () => {

    spyOn(component.deleteItemEvent, 'emit');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('a');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.deleteItemEvent.emit).toHaveBeenCalled();
  });
});
