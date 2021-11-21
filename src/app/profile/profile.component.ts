import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { ProfileService } from '../shared/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {
    id: localStorage.getItem('id'),
    email: localStorage.getItem('correo'),
    password: localStorage.getItem('clave')
  }

  constructor(public service: ProfileService) { }
  
  ngOnInit(): void {
    this.service.obtenerJornadas();
    this.service.obtenerAnunciosPorCuenta(JSON.stringify(JSON.parse(this.user.id || '{}')));
    console.log(this.service.list);
  }

  onSubmit(form: NgForm) {
    this.service.postAnuncio().subscribe(
      res => {
        this.service.obtenerAnunciosPorCuenta(JSON.stringify(JSON.parse(this.user.id || '{}')));
      },
      err => {
        console.log(err);
      }
    );
  } 

  eliminarAnuncio(id:string) {
    this.service.eliminarAnuncio(id)
  }
}
