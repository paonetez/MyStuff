import { Component } from '@angular/core';
import { EmpService } from "./emp.service";


@Component({
    selector: 'emp-form',
    templateUrl: './app/emp/emp-form.html',
    providers: [EmpService]
})
export class EmpFormComponent {
    empList:any[]=[];
    newEmp:any={};
    
    constructor(private empService:EmpService) {

    }

    ngOnInit() {
        this.initFetch();
    }

    initFetch() {
        let promiseObj = this.empService.fetchEmployees(); // this will make an AJAX call to the webservices to fetch all the stored employees
        promiseObj.then((response) => {
          this.reverseList(response.json()); //reverselist will reverse the array, so that the recently added employee will be at first position of array(list)
        },(error) => {
            console.log('something went wrong!'+error);
        });
    }

    onEmpFormSubmit(empForm:any) {
        let emp:any = {
            empId : this.newEmp.empId,
            firstName : this.newEmp.firstName,
            lastName:this.newEmp.lastName,
            designation:this.newEmp.designation,
            location:this.newEmp.location,
            project:this.newEmp.project
        }
    
        if(empForm.valid) {
            this.empService.storeEmployee(emp); // this will make an AJAX call to the webservices to store new employee
            this.empList.unshift(emp);  // for Showing newly added record in UI quickly, unshift is used to push element at first position of the array;
            this.newEmp={}; // for making all the form fields empty.
        }
    }


    reverseList(array:any[]) {
        let temp:any[] = [];
        for(let i=array.length-1;i>=0;i--) {
            temp.push(array[i]);
        }
        this.empList = temp;
    }


}