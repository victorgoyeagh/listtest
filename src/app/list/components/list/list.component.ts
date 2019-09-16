import { SortService } from './../../../sort/services/sort.service';
import { SearchService } from './../../../search/services/search.service';
import { IShareFilterParams } from './../../../filter/models/filter.model';
import { Direction } from '../../../sort/models/sort.model';
import { SortByPipe } from './../../pipe/sortBy';
import { FilterByPipe } from '../../pipe/filterBy';
import { IItem } from './../../models/list.model';
import { ListService } from './../../services/list.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { ISortData } from 'src/app/sort/models/sort.model';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
    public listItems = new Array<IItem>();
    public listFilteredItems = new Array<IItem>();
    public Direction = Direction;
    public sortByParam = 'name';
    public sortDirection = Direction.ACSCENDING;

    public filterByNameParam = undefined;
    public filterByIdParam = undefined;
    public filterByUsernameParam = undefined;
    public columnName = undefined;

    public sortData: ISortData = {
        sortParam: 'name',
        direction: Direction.ACSCENDING
    };

    @Input() private set inputSortParam(value: ISortData) {
        this.sortData = value;
    }

    public filterData = undefined;
    @Input() private set inputFilterParam(value: ISortData) {
        this.filterData = value;
    }

    constructor(
        private listService: ListService,
        private searchService: SearchService,
        private sortService: SortService
    ) { }

    ngOnInit() {
        this.listService.getListData().subscribe((value: Array<IItem>) => {
            this.listItems = value;
            this.listFilteredItems = this.listItems;
        });

        this.searchService.keywordSearchTerm.subscribe((value) => {
            this.filterByNameParam = value;
        });

        this.sortService.sortParam.subscribe((value: ISortData) => {
            this.sortByParam = value.sortParam;
            this.sortDirection = value.direction;
        });
    }

    ngAfterViewInit() { }

    get getSortDirection() {
        return ((this.sortDirection === Direction.ACSCENDING) ? false : true);
    }


}
