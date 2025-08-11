import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { IDepartment } from '../../../types/department';
import { Http } from '../../../services/http';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { IEmployee } from '../../../types/employee';

@Component({
  selector: 'app-employee-form',
  imports: [MatInputModule,FormsModule,ReactiveFormsModule,MatSelectModule,MatCardModule,MatButtonModule,
    MatRadioModule,MatDatepickerModule,
  MatIconModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss'
})
export class EmployeeForm {
  fb =inject(FormBuilder);
  @Input() employeeId!:number;
employeeForm = this.fb.group({
  id:[0],
      name: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      gender: [1,Validators.required],
      departmentID: ['',Validators.required],
      jobTitle:['',Validators.required],
      joiningDate: [null,[Validators.required]],
      lastWorkingDate :[],
      dateOfBirth:[null,[Validators.required]]
      
    });

    departments:IDepartment[]=[];
    httpService=inject(Http);
    ngOnInit(){
      this.httpService.getDepartment().subscribe((result)=>{
        this.departments=result;
      });

      console.log("here",this.data);

      if(this.data.employeeId){
        this.httpService.getEmployeeById(this.data.employeeId).subscribe((result)=>{
          console.log(result);
          this.employeeForm.patchValue(result as any);
          this.employeeForm.get('gender')?.disable();
          this.employeeForm.get('joiningDate')?.disable();
          this.employeeForm.get('dateOfBirth')?.disable();
        });
      }else{

      }

    }

    dialogRef=inject(MatDialogRef<EmployeeForm>);
    data = inject<EmployeeForm>(MAT_DIALOG_DATA)

    onSubmit(){
      if(this.data.employeeId){
let value:any = this.employeeForm.value;
      this.httpService.updateEmployee(this.data.employeeId,value).subscribe((result)=>{
        alert('Record Updated');
        this.dialogRef.close();
      });
      }
      else{
      console.log(this.employeeForm.value);
      console.log(this.employeeForm.valid);
      let value:any = this.employeeForm.value;
      this.httpService.addEmployee(value).subscribe((result)=>{
        alert('Record Saved');
        this.dialogRef.close();
      });
      }
    }



    
}
