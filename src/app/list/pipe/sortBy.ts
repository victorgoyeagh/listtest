import { Direction } from '../../sort/models/sort.model';
import { IItem } from './../models/list.model';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
    transform(array: Array<any>, orderField: string, orderType: Direction): Array<string> {
        if (array) {
            array.sort((a: any, b: any) => {
                const ae = a[orderField];
                const be = b[orderField];
                if (ae === undefined && be === undefined) {
                    return 0;
                }
                if ((ae === undefined) && (be !== undefined)) {
                    return orderType ? 1 : -1;
                }
                if (ae !== undefined && be === undefined) {
                    return (orderType) ? -1 : 1;
                }
                if (ae === be) {
                    return 0;
                }
                // tslint:disable-next-line:max-line-length
                return (orderType) ? (ae.toString().toLowerCase() > be.toString().toLowerCase() ? -1 : 1) : (be.toString().toLowerCase() > ae.toString().toLowerCase() ? -1 : 1);
            });
            return array;
        }
    }
}
