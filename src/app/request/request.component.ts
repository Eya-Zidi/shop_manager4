import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderEmployeeComponent } from '../header-employee/header-employee.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [FormsModule, CommonModule,HeaderEmployeeComponent,FooterComponent ],
  providers: [AccountService],
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  form: any = {
    fullName: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dept: '',
    imma: '',
    role: ''
  };

  constructor(private accountService: AccountService) {}

  createAccount(): void {
    const { fullName,last_name, email, password, confirmPassword, phone, dept, imma, role } = this.form;

    if (!fullName || !last_name || !email || !password || !confirmPassword || !phone || !dept || !imma || !role) {
      alert('Please fill in all required fields.');
      return;
    }

    const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{5,10}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must be 5-10 characters long and contain at least one symbol.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (imma.toString().length !== 5) {
      alert("Employee ID (imma) must be exactly 5 digits.");
      return;
    }

    // Create FormData object to send to PHP
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('dept', dept);
    formData.append('imma', imma);
    formData.append('role', role);
    formData.append('confirmPassword', confirmPassword); // if your PHP checks this

    this.accountService.createAccount(formData).subscribe(
      (res: any) => {
        alert(res.message || 'Account created successfully');
        if (res.success) {
          this.resetForm();
        }
      },
      err => {
        console.error(err);
        alert("An error occurred while creating the account.");
      }
    );
  }

  resetForm(): void {
    this.form = {
      fullName: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      dept: '',
      imma: '',
      role: ''
    };
  }
}
