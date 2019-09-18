import { SortService } from './../../../sort/services/sort.service';
import { SearchService } from './../../../search/services/search.service';
import { Direction } from '../../../sort/models/sort.model';
import { SortByPipe } from './../../pipe/sortBy';
import { FilterByPipe } from '../../pipe/filterBy';
import { IItem } from './../../models/list.model';
import { ListService } from './../../services/list.service';
import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { ISortData } from 'src/app/sort/models/sort.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
    public listItems = new Array<IItem>();
    public listFilteredItems = new Array<IItem>();
    public Direction = Direction;
    public sortByParam = 'name';
    public sortDirection = Direction.ACSCENDING;

    public filterByNameParam = undefined;
    public filterByIdParam = undefined;
    public filterByUsernameParam = undefined;
    public columnName = undefined;
    public p = 1;
    private defaultItemsPerPage = 5;
    private subs = new Array<Subscription>();

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
        const sub_1 = this.listService.getListData().subscribe((value: Array<IItem>) => {
            this.listItems = value;
            this.listFilteredItems = this.listItems;
        });

        const sub_2 = this.searchService.keywordSearchTerm.subscribe((value) => {
            this.filterByNameParam = value;
        });

        const sub_3 = this.sortService.sortParam.subscribe((value: ISortData) => {
            this.sortByParam = value.sortParam;
            this.sortDirection = value.direction;
        });

        this.subs.push(sub_1);
        this.subs.push(sub_2);
        this.subs.push(sub_3);
    }

    ngAfterViewInit() { }

    get getSortDirection() {
        return ((this.sortDirection === Direction.ACSCENDING) ? false : true);
    }

    deleteItem(id: number) {
        this.listService.deleteItem(id).subscribe((response: any) => {
            console.log(response);
        });
    }

    ngOnDestroy(): void {
        this.subs.forEach((sub) => {
            sub.unsubscribe();
        });
    }
}
