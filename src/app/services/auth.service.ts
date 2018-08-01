import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthService {
  private user;

  private mockedUsers = [
    { nome: 'Vágner Silveira',
      id: '1',
      email: 'vagner.olliver@gmail.com',
      password: '123'
    },
    { nome: 'Fulano',
      id: '1',
      email: 'fulano.olliver@gmail.com',
      password: '@vanger2018'
    }
  ];

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {  }

  authUser(password, email) {
    const user = this.mockedUsers.filter(mockedUser => {
      return email == mockedUser.email;
    });

    if (user.length < 1) {
      this.toastr.error('Este e-mail não esta cadastrado.', 'Dragons Login');
      return false;
    } else if (user.length === 1) {
      if (user[0].password == password) {
         this.user = user[0];
      } else {
        this.toastr.error('Senha inválida', 'Dragons Login');
        return false;
      }
    }  

    localStorage.setItem('logged', 'true');
    localStorage.setItem('name', this.user.nome);

    this.router.navigate(['/system']);
  }

  logout() {
    localStorage.removeItem('logged');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
  }

  isLogged(): boolean {
    return localStorage.getItem('logged') === 'true';
  }

  loggedUserName() {
    return localStorage.getItem('name');
  }
}
