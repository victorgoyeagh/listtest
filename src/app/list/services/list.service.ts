import { IItem } from './../models/list.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ListService {
    private listDataUrl = environment.api.domain + environment.api.paths.data;
    private deleteDataUrl = environment.api.domain + environment.api.paths.delete;
    private addDataUrl = environment.api.domain + environment.api.paths.add;
    public listData = new Subject<any>();

    constructor(
        private http: HttpClient
    ) { }

    getListData() {
        return this.http.get<any>(this.listDataUrl)
            .pipe(
                map((value) => {
                    this.listData.next(value);
                    return value;
                })
            );
    }

    addItem(item: IItem) {
        return this.http.post(this.addDataUrl, { item })
        .pipe(
            catchError((err) => {
                throw(err);
            })
        );
    }

    deleteItem(id: number) {
        console.log(id);
        const httpParams = new HttpParams();
        httpParams.set('id', id.toString());
        const options = { params: httpParams };
        return this.http.delete(this.deleteDataUrl + id, options);
    }
}
