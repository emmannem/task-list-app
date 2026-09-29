import { Component } from '@angular/core';
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
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
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
    });
  }

  addTask() {
    console.log(this.task);
    if (!this.ifExistTask(this.task)) {
      this.tasks.push(this.task);
      console.log(this.tasks);
      this.task = '';
    } else {
      console.log('La tarea ya existe');
    }
  }

  private ifExistTask(task: string) {
    return this.tasks.find(
      (item: string) => task.toUpperCase().trim() === item.toUpperCase().trim(),
    );
  }
}
