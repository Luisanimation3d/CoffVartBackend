export function validarSinEspacios(args: {[key: string]: string | number}) {
    const regex = /\s/;
    let errores: {[key: string]: string| number} = {};
    Object.entries(args).forEach(([key, value]) => {
      if (regex.test(String(value))) {
        errores[key] = 'El campo no debe contener espacios';
      }
    });
    return errores;
  }

export function validarSoloEspacios(args: {[key: string]: string | number}) {
    const regex = /^\s*$/;
    let erroresSpace: {[key: string]: string| number} = {};
    Object.entries(args).forEach(([key, value]) => {
      if (regex.test(String(value))) {
        erroresSpace[key] = 'El campo no debe contener solo espacios';
      }
    });
    return erroresSpace;
    }

export function validarSoloNumeros (args: {[key: string]: string | number}) {
    const regex = /^[0-9]*$/;
    let erroresNumbers: {[key: string]: string| number} = {};
    Object.entries(args).forEach(([key, value]) => {
      if (regex.test(String(value)) === false) {
        erroresNumbers[key] = 'El campo solo debe contener números';
      }
    });
    return erroresNumbers;
  }

export function validarSoloLetras (args: {[key: string]: string | number}) {
    const regex = /^[a-zA-Z]*$/;
    let erroresLetter: {[key: string]: string| number} = {};
    Object.entries(args).forEach(([key, value]) => {
      if (regex.test(String(value)) === false) {
        erroresLetter[key] = 'El campo solo debe contener letras';
      }
    });
    return erroresLetter;
  }

export function validarNoNegativos(args: {[key: string]: number}) {
    let erroresNegativos: {[key: string]: string} = {};
    Object.entries(args).forEach(([key, value]) => {
      if (value < 0) {
        erroresNegativos[key] = 'El campo no puede contener un número negativo';
      }
    });
    return erroresNegativos;
  }