import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component {
  userForm: FormGroup;
  
  constructor(private router: Router) {
    this.userForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'passportId': new FormControl('', Validators.required),
      'passportExpiryDate': new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
   
    this.router.navigate(['/step2']);
  }  
}