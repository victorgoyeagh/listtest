import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { ListService } from './services/list.service';
import { HttpClientModule } from '@angular/common/http';
import { SortByPipe } from './pipe/sortBy';
import { FilterByPipe } from './pipe/filterBy';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ListService],
  declarations: [ListComponent, SortByPipe, FilterByPipe],
  exports: [ListComponent, SortByPipe, FilterByPipe]
})
export class ListModule { }
