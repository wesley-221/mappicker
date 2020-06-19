import { NgModule } from '@angular/core';

import { LayoutModule } from '@angular/cdk/layout';

import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';


const modules: any[] = [
	LayoutModule,
	MatIconModule,
	MatToolbarModule,
	MatButtonModule,
	MatMenuModule,
	MatFormFieldModule,
	MatInputModule,
	MatGridListModule,
	MatDividerModule,
	MatSelectModule,
	MatChipsModule,
	MatTabsModule,
	MatDialogModule,
	MatSliderModule
];

@NgModule({
	imports: [...modules],
	exports: [...modules]
})
export class AngularMaterialModule { }
