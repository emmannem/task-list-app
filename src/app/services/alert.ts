import { inject, Service } from '@angular/core';
import { AlertController } from '@ionic/angular';

// En versiones recientes de angular, ya viene implicito lo que hace el decorador 
// @Injectable({ providedIn: 'root' })
// El decorador @Service() es una forma de marcar la clase como un servicio 
// que puede ser inyectado en otros componentes o servicios. 
// Esto permite que Angular maneje la creación y el ciclo de vida del servicio automáticamente.
@Service()
export class Alert {
  private alertController: AlertController = inject(AlertController);

  // El método alertMessage es una función asíncrona que muestra un mensaje de alerta en la aplicación.
  // Recibe dos parámetros: header (el título de la alerta) y message (el contenido del mensaje).
  // Utiliza el AlertController de Ionic para crear y presentar la alerta en la interfaz de usuario.
  async alertMessage(
    header: string,
    message: string,
  ) {
    // Hace un await hasta que se cree la alerta con el header 
    // y message proporcionados, y un botón de 'OK' para cerrarla.
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    // Hace un await hasta que la alerta se presente en la pantalla.
    // present() es un método que muestra la alerta en la interfaz de usuario.
    await alert.present();
  }
}
