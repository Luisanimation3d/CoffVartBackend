**README.md**

## Backend Coff-v-Art

### Descripción

Este proyecto es un backend para la aplicación Coff-v-Art, que es una aplicación web que permita gestionar los procesos de compra y venta de acuerdo con las necesidades del cliente.

### Objetivos

Los objetivos de este proyecto son:

* Proporcionar una API para que la aplicación Coff-v-Art pueda almacenar y recuperar datos.

### Tecnologías utilizadas

Este proyecto utiliza las siguientes tecnologías:

* TypeScript
* Express
* Dotenv-ts

### Instalación y configuración

Para instalar y configurar este proyecto, sigue los siguientes pasos:

1. Clona el repositorio del proyecto.
2. Instala las dependencias del proyecto usando el siguiente comando:

```ts
npm install
```

```ts
npm install -D
```

3. Configura las variables de entorno del proyecto. Para ello, crea un archivo llamado `.env` en la raíz del proyecto y agrega las siguientes variables:

```
PORT=3000
```

4. Inicia el servidor usando el siguiente comando:

```ts
// Este comando primero ejecuta tsc y luego lanza el servidor de desarrollo
npm run start
```

```ts
// Este comando ejecuta tsc con el --watch para vigilar el archivo y compilarlo despues de cada cambio y al mismo tiempo ejecuta el node --watch dist/index.js para vigilar también los cambios del servidor en js
npm run dev
``` 
