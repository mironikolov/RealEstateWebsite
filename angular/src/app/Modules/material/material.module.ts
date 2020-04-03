import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  exports: [
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class MaterialModule { }