import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GroceryItem} from "../item.model";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  @Input()loadedGrocerItems: GroceryItem[];
  @Output()addItemEvent = new EventEmitter<GroceryItem>();
  addItemField: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.addItemField = new FormGroup({
      'newItem': new FormControl(null, [Validators.required, this.isDuplicate.bind(this)])
    })
  }

  onAddItem(){
    const addedItem = this.addItemField.value.newItem
    if (this.addItemField.status === 'VALID') {
      this.addItemEvent.emit(addedItem)
    }
    this.addItemField.reset()
  }

  isDuplicate(control: FormControl): {[s: string]: boolean} {
    let nameArray = this.loadedGrocerItems.map(function(item){ return item.name });
    if (nameArray.includes(control.value)) {
      return {'addedDuplicateItem': true}
    } return null
  }

}
