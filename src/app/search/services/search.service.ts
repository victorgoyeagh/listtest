import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SearchService {
    public keywordSearchTerm: Subject<string> = new Subject<string>();

    constructor() {

    }
}
