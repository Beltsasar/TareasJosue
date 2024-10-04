import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para redireccionar

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.page.html',
  styleUrls: ['./crear-tarea.page.scss'],
})
export class CrearTareaPage implements OnInit {
  tituloTarea: string = '';

  ListaTareas:any[]=[]

  constructor(private router: Router) {} // Inyecta el router

  ngOnInit() {}

  // Método para crear una tarea y guardarla en localStorage
  crearTareaYguardar() {
    localStorage.setItem('tareas', JSON.stringify(this.ListaTareas));
  }
}
