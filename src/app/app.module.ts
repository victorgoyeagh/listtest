import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';


// modules
import { ListModule } from './list/list.module';
import { SortModule } from './sort/sort.module';
import { FilterModule } from './filter/filter.module';
import { SearchModule } from './search/search.module';

// plugins
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    ListModule,
    SortModule,
    FilterModule,
    SearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
