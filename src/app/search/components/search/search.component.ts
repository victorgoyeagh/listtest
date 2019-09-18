import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy, OnInit, AfterViewInit, OnDestroy {
    private searchSub: Subscription;
    public searchTerm: string = undefined;
 
    @ViewChild('txtSearch') txtSearch: ElementRef;

    constructor(
        private searchService: SearchService
    ) {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {

        this.searchSub = fromEvent(<HTMLInputElement>this.txtSearch.nativeElement, 'input')
            .pipe(
                map(
                    (event: Event) => (<HTMLInputElement>event.target).value
                ),
                debounceTime(800)
            )
            .subscribe((value: string) => {

                this.searchTerm = value;
                this.searchService.keywordSearchTerm.next(this.searchTerm);
            }
        );
    }

    ngOnDestroy(): void {
        this.searchSub.unsubscribe();
    }

}
