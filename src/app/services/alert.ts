import { inject, Service } from '@angular/core';
import { AlertController } from '@ionic/angular';

// En versiones recientes de angular, ya viene implicito lo que hace el decorador
// @Injectable({ providedIn: 'root' })
// El decorador @Service() es una forma de marcar la clase como un servicio
// que puede ser inyectado en otros componentes o servicios.
// Esto permite que Angular maneje la creación y el ciclo de vida del servicio automáticamente.
@Service()
export class Alert {
  // La propiedad alertController es una instancia de AlertController que se inyecta en el servicio Alert.
  // AlertController es un servicio proporcionado por Ionic que permite crear y controlar alertas en la aplicación.
  // La función inject() es una forma de inyectar dependencias en Angular.
  private alertController: AlertController = inject(AlertController);

  // El método alertMessage es una función asíncrona que muestra un mensaje de alerta en la aplicación.
  // Recibe dos parámetros: header (el título de la alerta) y message (el contenido del mensaje).
  // Utiliza el AlertController de Ionic para crear y presentar la alerta en la interfaz de usuario.
  async alertMessage(header: string, message: string) {
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

  // El método alertConfirm es una función asíncrona que muestra un mensaje de confirmación en la aplicación.
  // Recibe varios parámetros:
  // header (el título de la alerta),
  // message (el contenido del mensaje),
  // functionOk (una función que se ejecutará si el usuario confirma la acción),
  // cancelText (el texto del botón de cancelar, con un valor predeterminado de 'Cancelar'),
  // confirmText (el texto del botón de confirmar, con un valor predeterminado de 'Confirmar').
  // Utiliza el AlertController de Ionic para crear y presentar la alerta en la interfaz de usuario.
  async alertConfirm(
    header: string,
    message: string,
    functionOk: Function,
    cancelText: string = 'Cancelar',
    confirmText: string = 'Confirmar',
  ) {
    const alert = await this.alertController.create({
      header,
      message,
      // Define los botones de la alerta, incluyendo el botón de cancelar
      // y el botón de confirmar.
      buttons: [
        {
          text: cancelText,
          role: 'cancel',
        },
        {
          text: confirmText,
          role: 'confirm',
          // Define la función que se ejecutará cuando el usuario
          // haga clic en el botón de confirmar.
          handler: () => {
            functionOk();
          },
        },
      ],
    });

    await alert.present();
  }
}
