import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDepartment } from '../types/department';
import { Observable } from 'rxjs';
import { IEmployee } from '../types/employee';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Http {
  http = inject(HttpClient);
  
  constructor() { }

  getDepartment():Observable<IDepartment[]>{
    return this.http.get<IDepartment[]>(environment.apiURL + '/api/Department');
  }
  addDepartment(name:string){
    return this.http.post(environment.apiURL + '/api/Department', {
      name:name
    });
  }
  updateDepartment(id:number,name:string){
    return this.http.put(environment.apiURL + '/api/Department/'+id, {
      name:name
    });
  }
  deleteDepartment(id:number){
    return this.http.delete(environment.apiURL + '/api/Department/'+id, {
      
    });
  }


  getEmployee(filter:any){
    var params= new HttpParams({ fromObject : filter });
    
    return this.http.get<IEmployee[]>(environment.apiURL+"/api/Employee?"+params);
  }

  getEmployeeById(id:number){
    return this.http.get<IEmployee>(environment.apiURL+"/api/Employee/"+id);
  }

  addEmployee(employee:IEmployee){
    return this.http.post(environment.apiURL+"/api/Employee",employee);
  }

  deleteEmployee(id:number){
    return this.http.delete(environment.apiURL+"/api/Employee/"+id);
  }

  updateEmployee(id:number,employee:IEmployee){
    return this.http.put(environment.apiURL+"/api/Employee/"+id,employee);
  }

}
