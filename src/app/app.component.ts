import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {GroceryItem} from './item.model';
import {GroceryService} from './grocery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedGrocerItems: GroceryItem[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private groceryService: GroceryService) {}

  ngOnInit() {
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

  onAdd(addedItem){
      this.loadedGrocerItems.push({name: addedItem, grocery_id: Math.random()});
  }

  onDelete(deletedItem) {
    this.loadedGrocerItems = this.loadedGrocerItems.filter((element) => element.grocery_id !== deletedItem.grocery_id)
  }
}

