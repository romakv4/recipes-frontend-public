import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-alphabet-select-modal',
  templateUrl: './alphabet-select-modal.component.html',
  styleUrls: ['./alphabet-select-modal.component.css']
})
export class AlphabetSelectModalComponent {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public alphabet: string[]
  ) { }
}
