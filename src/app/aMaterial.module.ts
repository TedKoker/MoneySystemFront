import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
    ],
    exports: [
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatDialogModule
    ]
})
export class AModule { }
