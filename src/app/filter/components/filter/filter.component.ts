import { IShareFilterParams } from './../../models/filter.model';
import { EventEmitter } from '@angular/core';
import { ListService } from './../../../list/services/list.service';
import { IItem } from './../../../list/models/list.model';
import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, ViewChild, Output } from '@angular/core';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
    public listItems = new Array<IItem>();
    public nameFilterDistinctValues = new Array<string>();
    public nameCriticalCheckDistinctValues = new Array<string>();
    public distinctValues = new Array<string>();
    public filterValues = new Array<string>();

    @ViewChildren('optionsCheckboxes') optionsCheckboxes: QueryList<HTMLInputElement>;
    @ViewChild('defaultCheckbox') defaultCheckbox: ElementRef;
    @Output() shareFilterParams: EventEmitter<IShareFilterParams> = new EventEmitter<IShareFilterParams>();

    public filterColumns = undefined;
    @Input() private set inputFilterColumns(value: Array<string>) {
        this.filterColumns = value;
    }

    constructor(private listService: ListService) { }

    ngOnInit() {

        this.listService.listData.subscribe((value: IItem[]) => {
            this.listItems = value;
            this.distinctValues = this.getDistinctValues(this.filterColumns, this.listItems);
        });
    }

    shareFilterValues(columnName: string, array: Array<string>, event: Event) {
        const checkEl = <HTMLInputElement>event.target;
        const isChecked = checkEl.checked;
        const value = checkEl.value;
        const checkedValues = new Array<string>();
        const allCheckbox = (<HTMLInputElement>this.defaultCheckbox.nativeElement);

        if (value === 'all') {
            const vals = this.optionsCheckboxes.toArray().map((a: any) => {
                if (isChecked) {
                    (<HTMLInputElement>a.nativeElement).checked = true;
                }
                checkedValues.push((<HTMLInputElement>a.nativeElement).value);
            });
        } else {
            allCheckbox.checked = false;
            this.optionsCheckboxes.toArray().forEach((el: any) => {
                const check = el.nativeElement;
                if (check.checked === true) {
                    checkedValues.push(check.value);
                }
            });
        }

        const filterVals = {
            columnName: this.filterColumns[0],
            values: checkedValues
        };

        this.shareFilterParams.emit(filterVals);
    }

    formatId(name, index) {
        const regex = / /gi;
        return name.toLowerCase().replace(regex, '_') + '_' + index;
    }

    getDistinctValues(columnName, array) {
        const result = [];
        const a = new Map();
        for (const item of array) {
            if (!a.has(item[columnName])) {
                a.set(item[columnName], true);    // set any value to Map
                result.push(
                    item[columnName]
                );
            }
        }
        return result;
    }

}
