
import { SortService } from './../../services/sort.service';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Direction, ISortData } from '../../models/sort.model';


@Component({
    selector: 'app-sort',
    templateUrl: './sort.component.html',
    styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

    @Output() shareSortParam = new EventEmitter<ISortData>();
    private sortDirection: Direction = undefined;
    private sortParam = undefined;
    public direction = Direction.ACSCENDING;

    constructor(
        private sortService: SortService
    ) { }

    ngOnInit() {
    }

    handleSelectedSortParam(event: Event) {
        const selectedValue = (<HTMLSelectElement>event.target).value;
        if (selectedValue.length) {
            this.sortParam = selectedValue;

            const sData: ISortData = {
                sortParam: this.sortParam,
                direction: this.direction
            };

            this.sortService.sortParam.next(sData);
            // this.shareSortParam.emit(sData);
        }
    }

    handleSortDirection(event: Event) {
        const target = <HTMLButtonElement>event.target;
        const isAsc = target.classList.contains('up');

        if (isAsc) {
            target.classList.remove('up');
            target.classList.add('down');
        } else {
            target.classList.add('up');
            target.classList.remove('down');
        }

        this.direction = (isAsc) ? Direction.ACSCENDING : Direction.DESCENDING;

        const sData: ISortData = {
            sortParam: this.sortParam,
            direction: this.direction
        };

        if (this.sortParam) {
            this.sortService.sortParam.next(sData);
            // this.shareSortParam.emit(sData);
        }
    }

}
