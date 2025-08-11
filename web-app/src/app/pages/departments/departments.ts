import { Component, inject } from '@angular/core';
import { Http } from '../../services/http';
import { IDepartment } from '../../types/department';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-departments',
  
  imports: [MatButtonModule,MatInputModule,MatFormFieldModule,FormsModule],
  templateUrl: './departments.html',
  styleUrl: './departments.scss'
})
export class Departments {
  httpService = inject(Http);
  //constructor(private httpService: Http) {}
  departments:IDepartment[]=[];
  isFormOpen = false;
  //users=["Ram","Mohan","Krishna"];
  departmentList: any[]=[];
  ngOnInit(){
    this.getLatestData();
    
  }
  
  getLatestData(){
    this.httpService.getDepartment().subscribe((result:IDepartment[]) => {
      //debugger;
      this.departments=result;
      //console.log(this.userList);
    });
  }

  departmentName!:string;
  AddDepartment(){
    //console.log(this.departmentName);
    this.httpService.addDepartment(this.departmentName).subscribe(()=>{
      alert("Record Saved.");
      this.isFormOpen=false;
      this.getLatestData();
    });
  }

  editID=0;
  EditDepartment(department:IDepartment){
    this.departmentName = department.name;
    this.isFormOpen=true;
    this.editID=department.id;
  }

  UpdateDepartment(){
    this.httpService.updateDepartment(this.editID,this.departmentName).subscribe(()=>{
      alert("Record Updated!");
      this.isFormOpen=false;
      this.editID=0;
      this.getLatestData();
    })
  }

  DeleteDepartment(id:number){
    this.httpService.deleteDepartment(id).subscribe(()=>{
      alert("Record Deleted!");
      this.getLatestData();
    })
  }

}
