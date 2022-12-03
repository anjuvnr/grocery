import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {GroceryItem} from "./item.model";

@Injectable({ providedIn: 'root' })
export class GroceryService {

  constructor(private http: HttpClient) {}

  fetchGroceryItems() {
    return this.http
      .get(
        'https://run.mocky.io/v3/abdb48bf-157e-48b9-9529-7d9e6830a221'
      )
      .pipe(
        map(responseData => {
          const postsArray: GroceryItem[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key]});
            }
          }
          return postsArray;
        })
      );
  }
}
