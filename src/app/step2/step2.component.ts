
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component {

  visaForm: FormGroup;
  
  constructor(private router: Router) {
    this.visaForm = new FormGroup({
      'visaId': new FormControl('', Validators.required),
      'departureDate': new FormControl('', Validators.required),
      'returnDate': new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Your visa validation logic goes here
    // If validation passes, navigate to the next step
    this.router.navigate(['/step3']);
  }
}