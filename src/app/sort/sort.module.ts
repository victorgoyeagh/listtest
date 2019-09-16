import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortComponent } from './components/sort/sort.component';
import { SortService } from './services/sort.service';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [SortService],
  declarations: [SortComponent],
  exports: [SortComponent]
})
export class SortModule { }
