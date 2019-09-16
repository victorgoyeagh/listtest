import { IShareFilterParams } from './filter/models/filter.model';
import { Direction } from './sort/models/sort.model';
import { ISortData } from 'src/app/sort/models/sort.model';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public filterParams = undefined;
    public sortData: ISortData = {
        sortParam: '',
        direction: Direction.ACSCENDING
    };

    handleFilterParams(value: IShareFilterParams) {
        this.filterParams = value;
    }

    logSortParam(value: ISortData) {
        this.sortData = value;
    }
}
