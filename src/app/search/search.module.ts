import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from './services/search.service';


@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [
        SearchComponent
    ],
    providers: [
        SearchService
    ],
    exports: [
        SearchComponent
    ]
})
export class SearchModule { }
