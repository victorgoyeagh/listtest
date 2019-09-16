import { Direction } from '../../sort/models/sort.model';
import { IItem } from '../models/list.model';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {
    transform(items: any[], term): any {
        let retItems: Array<any>;

        if (!term) {
            retItems = items;
        } else {
            retItems = items.filter((item) => {
                term = term.toLowerCase();
                return (
                    item['id'].toString().toLowerCase().indexOf(term) !== -1 ||
                    item['name'].toLowerCase().indexOf(term) !== -1 ||
                    item['username'].toLowerCase().indexOf(term) !== -1
                );
            });

        }
        return retItems;
    }
}
