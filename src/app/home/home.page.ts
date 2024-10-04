import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'; // Importar ElementRef y ViewChild
import { ApiService } from '../services/api.service';

interface Tarea {
  id: number;
  nombre: string;
  completada: boolean;
  fechaCreacion: Date;
  origen: 'api' | 'local';  // Nuevo campo
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  TareaIngresada: string = '';
  ListaApi: Tarea[] = [];
  ListaLocal: Tarea[] = [];
  ListaTotal: Tarea[] = [];

  constructor(private todoService: ApiService) {}

  ngOnInit(): void {
    this.recuperarTareas();
    this.obtenerTareasDesdeApi();
  }

  recuperarTareas() {
    const tareasJSON = localStorage.getItem('tareas');
    this.ListaLocal = tareasJSON ? JSON.parse(tareasJSON) : [];
    this.ListaLocal.forEach(tarea => tarea.origen = 'local'); // Agregamos origen local a cada tarea
    this.actualizarListaTotal();
  }

  actualizarListaTotal() {
    this.ListaTotal = [...this.ListaApi, ...this.ListaLocal];
  }

  obtenerTareasDesdeApi() {
    this.todoService.getTareas().subscribe(tareas => {
      this.ListaApi = tareas.slice(0, 3).map(tarea => ({
        id: tarea.id,
        nombre: tarea.title,
        completada: tarea.completed,
        fechaCreacion: new Date(),
        origen: 'api'  // Agregamos origen API a cada tarea
      }));
      this.actualizarListaTotal();
    });
  }

  agregarTarea() {
    if (this.TareaIngresada.trim() === '') return;

    const nuevaTarea: Tarea = {
      id: this.ListaLocal.length + 1,
      nombre: this.TareaIngresada,
      completada: false,
      fechaCreacion: new Date(),
      origen: 'local'  // Indicamos que es una tarea local
    };

    this.ListaLocal.push(nuevaTarea);
    localStorage.setItem('tareas', JSON.stringify(this.ListaLocal));
    this.actualizarListaTotal();
    this.TareaIngresada = '';
  }

  borrarTarea(tarea: Tarea) {
    if (tarea.origen === 'local') {
      this.ListaLocal = this.ListaLocal.filter(t => t.id !== tarea.id);
      localStorage.setItem('tareas', JSON.stringify(this.ListaLocal));
    } else if (tarea.origen === 'api') {
      this.ListaApi = this.ListaApi.filter(t => t.id !== tarea.id);
    }

    this.actualizarListaTotal();
  }

  marcarComoCompletada(tarea: Tarea) {
    tarea.completada = !tarea.completada;
    if (tarea.origen === 'local') {
      localStorage.setItem('tareas', JSON.stringify(this.ListaLocal));
    }
    this.actualizarListaTotal();
  }
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {  // Aquí se verifica si se presionó la tecla Enter
      this.agregarTarea();        // Llamar a la función para agregar la tarea
    }
  }
}
