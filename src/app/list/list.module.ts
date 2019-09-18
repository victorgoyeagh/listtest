import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { ListService } from './services/list.service';
import { HttpClientModule } from '@angular/common/http';
import { SortByPipe } from './pipe/sortBy';
import { FilterByPipe } from './pipe/filterBy';

import { NgxPaginationModule } from 'ngx-pagination';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [ListService],
  declarations: [AddItemComponent, ListComponent, SortByPipe, FilterByPipe],
  exports: [AddItemComponent, ListComponent, SortByPipe, FilterByPipe]
})
export class ListModule { }
