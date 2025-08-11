import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { MatButton } from '@angular/material/button';



@Component({
  selector: 'app-table',
  imports: [MatTableModule,MatCardModule,MatButton],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table {
  @Input() data: any[]=[];
  @Input() displayedColumns: any[]=[];
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  edit(rowData:any[]){
    this.onEdit.emit(rowData);
  }

   delete(rowData:any[]){
    this.onDelete.emit(rowData);
  }
}
