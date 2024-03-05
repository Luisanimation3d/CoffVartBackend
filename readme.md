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

```bash
npm install
```

```bash
npm install -D
```

3. Configura las variables de entorno del proyecto. Para ello, crea un archivo llamado `.env` en la raíz del proyecto y agrega las siguientes variables:

```
PORT=3000
```
4. Ejecuta los seeers para obtener los datos base de la base de datos

```bash
npm run seed
```

5. Inicia el servidor usando el siguiente comando:

```bash
// Este comando primero ejecuta tsc y luego lanza el servidor de desarrollo
npm run start
```

```bash
// Este comando ejecuta tsc con el --watch para vigilar el archivo y compilarlo despues de cada cambio y al mismo tiempo ejecuta el node --watch dist/index.js para vigilar también los cambios del servidor en js
npm run dev
``` 
> ## globalValidations.middlewares.ts
Estas validaciónes son para implementar en cada uno de los middleware que lo requieran, están estandarizadas para ser usadas en cualquier controlador.

## Implementación
Para su implementación deberan ir a sus respectivos controladores y hacer lo siguiente:
```tsx
export const validateRoutePost = async (req:any, res: any, next: any) => {
    const {name, nit, email, address, phone } = req.body;
    
     

//para validar que un campo no pueda tener espacios  
let errores = validarSinEspacios({nit, email, phone});//cambiar por los campos que desean validar
  if (Object.keys(errores).length > 0) {
        res.status(400).json(errores);
        return;
    } 
//para validar que un campo no pueda tener solo espacios
let erroresSpace = validarSoloEspacios({name, nit, email, address, phone});
  if (Object.keys(erroresSpace).length > 0) {
        res.status(400).json(erroresSpace);
        return;
    }
//para validar que un campo solo permita numeros
let erroresNumbers = validarSoloNumeros({nit, phone});
  if (Object.keys(erroresNumbers).length > 0) {
        res.status(400).json(erroresNumbers);
        return;
    }
//para validar que un campo solo permita letras
let erroresLetter = validarSoloLetras({name});
    if (Object.keys(erroresLetter).length > 0) {
        res.status(400).json(erroresLetter);
        return;
    }
    
    ... 
}