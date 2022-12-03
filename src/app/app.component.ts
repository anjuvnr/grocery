import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {GroceryItem} from './item.model';
import {GroceryService} from './grocery.service';
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedGrocerItems: GroceryItem[] = [];
  isFetching = false;
  error = null;
  addItemField: FormGroup;

  constructor(private http: HttpClient, private groceryService: GroceryService) {}

  ngOnInit() {
    this.addItemField = new FormGroup({
    'newItem': new FormControl(null, [Validators.required, this.isDuplicate.bind(this)])
    })
    this.isFetching = true;
    this.groceryService.fetchGroceryItems().subscribe(
      items => {
        this.isFetching = false;
        this.loadedGrocerItems = items;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  onAdd(){
    const addedItem = this.addItemField.value.newItem
    if (this.addItemField.status === 'VALID') {
      this.loadedGrocerItems.push({name: addedItem, grocery_id: Math.random()});
    }
    this.addItemField.reset()
  }

  onDelete(itemId) {
    this.loadedGrocerItems = this.loadedGrocerItems.filter((post) => post.grocery_id !== itemId)
  }

  isDuplicate(control: FormControl): {[s: string]: boolean} {
    let nameArray = this.loadedGrocerItems.map(function(item){ return item.name });
    if (nameArray.includes(control.value)) {
      return {'addedDuplicateItem': true}
    } return null
  }
}

