import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountsSheet } from '../interfaces/accounts-sheet';
import { CustomResponse } from '../interfaces/custom-response';
import { CustomerKYC } from '../interfaces/customer-kyc';

@Injectable({
  providedIn: 'root'
})
export class MigrationService {

  private baseUrl = environment.baseUrl+'migrate';

  constructor(private http: HttpClient) { }

  migrateCustomers(file : File) : Observable<CustomResponse>{
    // Create form data
    const formData = new FormData(); 
        
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.post(this.baseUrl+"/customers", formData)
  }

  migrateAccounts(file : File) : Observable<CustomResponse>{
    // Create form data
    const formData = new FormData(); 
        
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.post(this.baseUrl+'/accounts', formData);
  }

  persistAccounts(accounts : AccountsSheet[]): Observable<CustomResponse>{
    return this.http.post(this.baseUrl+'/accounts/persist', accounts);
  }

  persistCustomers(customers : CustomerKYC[]): Observable<CustomResponse>{
    return this.http.post(this.baseUrl+'/customers/persist', customers);
  }
}
