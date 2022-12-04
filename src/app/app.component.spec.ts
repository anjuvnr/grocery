import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {GroceryService} from "./grocery.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControl} from "@angular/forms";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [HttpClientTestingModule],
      providers: [GroceryService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
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
  it('should add item to the loadedGrocerItems array', () => {
    component.onAdd('Water');
    let nameArray = component.loadedGrocerItems.map(function(item){ return item.name });
    expect(nameArray).toContain('Water');
  });
  it('should delete item from the loadedGrocerItems array', () => {
    let itemToDelete =       {
      "grocery_id": 1,
      "name": "Bananas"
    }
    expect(component.loadedGrocerItems.length).toEqual(2);
    component.onDelete(itemToDelete);
    let nameArray = component.loadedGrocerItems.map(function(item){ return item.name });
    expect(component.loadedGrocerItems.length).toEqual(1);
    expect(nameArray).not.toContain('Bananas');
  });
});
