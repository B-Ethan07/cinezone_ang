
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../common/auth-service';

@Component({
  selector: 'app-login',
  imports: [ RouterLink, FormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email!: string;
  password!: string;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.toastr.success('Login successful');
        this.authService.profil().subscribe({
          next: (user) => {
            //localStorage.setItem('userName', user.name);
            this.router.navigate(['/home']);
          },
          error: (err) => console.log(err)
        })
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.toastr.error(this.errorMessage);
      }
    });
  }

}
