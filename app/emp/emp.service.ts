import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmpService {

    constructor(private httpObj:Http){

    }

    fetchEmployees():Promise<any> {
       return this.httpObj.get('http://127.0.0.1:9000/allEmployees').toPromise();
    }

    storeEmployee(newEmployee:any):Promise<any> {
        return this.httpObj.post('http://127.0.0.1:9000/employee',newEmployee).toPromise();
    }

}





