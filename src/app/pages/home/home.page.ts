import { ChangeDetectorRef, Component, inject } from '@angular/core';
// Importación de Angular
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonLabel,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline } from 'ionicons/icons';

// Importación del servicio Alert que hemos creado en src/app/services/alert.ts
import { Alert } from '../../services/alert';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonList,
    FormsModule,
  ],
})
export class HomePage {
  // Injectamos el servicio Alert en HomePage para poder utilizarlo en esta página.
  private alertService: Alert = inject(Alert);

  private cdr = inject(ChangeDetectorRef);

  public tasks: string[] = [
    'Comprar Leche',
    'Dormir',
    'Descansar',
    'Estudiar',
    'Ver la Novela',
  ];
  public task: string = '';

  constructor() {
    addIcons({
      addOutline,
      trashOutline,
    });
  }

  addTask() {
    console.log(this.task);
    if (!this.ifExistTask(this.task)) {
      this.tasks.push(this.task);
      console.log(this.tasks);
      this.task = '';
      this.alertService.alertMessage(
        'Exito',
        'La tarea se ha agregado correctamente',
      );
    } else {
      console.log('La tarea ya existe');
      this.alertService.alertMessage('Error', 'La tarea ya existe');
    }
  }

  private ifExistTask(task: string) {
    // Utilizamos el método find() para buscar si la tarea ya existe en el array tasks.
    return this.tasks.find(
      // Comparamos la tarea que queremos agregar con las tareas existentes en el array tasks.
      // toUpperCase() convierte la cadena a mayúsculas para que la comparación no sea sensible a mayúsculas y minúsculas.
      // y trim() elimina los espacios en blanco al inicio y al final de la cadena para que la comparación no sea sensible a espacios.
      (item: string) => task.toUpperCase().trim() === item.toUpperCase().trim(),
    );
  }

  confirmDeleteTask(task: string) {
    this.alertService.alertConfirm(
      'Confirmar',
      '¿Estás seguro de que deseas eliminar esta tarea?',
      () => this.deleteTask(task),
    );
  }

  private deleteTask(task: string) {
    console.log('Eliminando tarea:', task);

    // findIndex(): Busca el valor que queremos eliminar y devuelve el indice
    const index = this.tasks.findIndex(
      (item: string) => task.toUpperCase().trim() === item.toUpperCase().trim(),
    );

    // Revisamos si el el indice devuelto es valido (cosa que no es tan necesaria)
    if (index != -1) {
      // splice(index): Elimina a partir del indice que se le esta proporcionando
      // (index, 1) : se le especifica cuantos elementos eliminar apartir del indice
      // en este caso se le indica 1 que es el indice.
      this.tasks.splice(index, 1);
      this.cdr.markForCheck();
    }
  }
}
