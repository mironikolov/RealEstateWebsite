import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule
  ],
  exports: [
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
