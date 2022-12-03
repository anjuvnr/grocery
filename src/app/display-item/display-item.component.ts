import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GroceryItem} from "../item.model";

@Component({
  selector: 'app-display-item',
  templateUrl: './display-item.component.html'
})
export class DisplayItemComponent implements OnInit {
  @Input()groceryItem: GroceryItem;
  @Output()deleteItemEvent = new EventEmitter<GroceryItem>();
  constructor() { }

  ngOnInit(): void {
  }

  onDeleteItemEvent(item) {
    this.deleteItemEvent.emit(item)
  }

}
