import { IItem } from './../models/list.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ListService {
    private listDataUrl = environment.api.domain + environment.api.paths.data;
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

}
