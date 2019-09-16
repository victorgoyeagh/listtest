import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchService } from '../../services/search.service';
import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as Rx from 'rxjs';

describe('ResultsComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [SearchComponent],
            providers: [SearchService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("should track record search input", () => {

        const keyword = "my search keyword";
        const searchInputElement = <HTMLInputElement>fixture.debugElement.nativeElement.querySelector("#txtSearch");
        searchInputElement.value = keyword;

        component.ngAfterViewInit();

        expect(component.searchTerm).toBeUndefined;
        expect(component.txtSearch.nativeElement.value).toBe(keyword);
        
        const fromEvSpy = jasmine.createSpy("Rx", Rx.fromEvent).and.returnValue(keyword);
        
        fixture.detectChanges();

        const valueFromEvent = fromEvSpy();
 
        expect(component.searchTerm).toBeDefined;
        expect(valueFromEvent).toEqual(keyword); 
    });
});
