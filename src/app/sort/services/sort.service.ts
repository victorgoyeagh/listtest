import { ISortData } from 'src/app/sort/models/sort.model';
import { ISortParams as SortParams } from '../models/sort.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SortService {
    public sortParam: Subject<ISortData> = new Subject<ISortData>();

    get sortParams(): Array<string> {
        const keys = Object.keys(SortParams);
        const newArr = [];
        const arr = keys.map((a) => {
            if ((keys.indexOf(a) % 2) !== 0) {
                newArr.push(a);
            }
        });
        return newArr;
    }
}
