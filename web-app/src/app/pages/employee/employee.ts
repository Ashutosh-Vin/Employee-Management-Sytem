import { Component, inject } from '@angular/core';
import { Http } from '../../services/http';
import { IEmployee } from '../../types/employee';
import { Table } from '../../components/table/table';
import { MatButtonModule } from '@angular/material/button';
import {  MatDialog } from '@angular/material/dialog';
import { EmployeeForm } from './employee-form/employee-form';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-employee',
  imports: [Table,MatButtonModule,MatInputModule,ReactiveFormsModule,MatFormFieldModule, MatFormField],
  templateUrl: './employee.html',
  styleUrl: './employee.scss'
})
export class Employee {
  httpService = inject(Http);
  employeesList:IEmployee[]=[];
  showCols=["id","name","email","phone","action"];
  filter:any = {};

  ngOnInit(){
    this.getEmployee();
    this.searchControl.valueChanges.subscribe((result:string | null)=>{
      console.log(result);
      this.filter.search = result;
      this.getEmployee();
    });
  }

searchControl= new FormControl('');

  getEmployee(){

    this.httpService.getEmployee(this.filter).subscribe((result)=>{
      this.employeesList=result;
    });
  }

  edit(employee:IEmployee){
    let ref = this.dialog.open(EmployeeForm, {
      panelClass:'m-auto',
      data:{
        employeeId:employee.id
      }

    });
    ref.afterClosed().subscribe(result=>{
      this.getEmployee();
    })
  }

  delete(employee:IEmployee){
    this.httpService.deleteEmployee(employee.id).subscribe(()=>{
      alert("Record Deleted!");
      this.getEmployee();
    });
  }

  add(){
    this.openDialog();
  }



  readonly dialog = inject(MatDialog);
  openDialog(): void {
    let ref = this.dialog.open(EmployeeForm, {
      panelClass:'m-auto',
      data:{
        //employeeId:0
      }

    });
    ref.afterClosed().subscribe(result=>{
      this.getEmployee();
    })
  }
  

}
