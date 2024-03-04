import { companyModel } from "../models/companys.model";    
import { emailValidation } from "./login.middlewares";
import { validarSinEspacios, validarSoloEspacios, validarSoloLetras, validarSoloNumeros } from "./globalValidations.middlewares";

/**
 * The function validates if a companys exists before proceeding to the next middleware.
 * @param {any} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {any} res - The `res` parameter is the response object. It is used to send the response back
 * to the client.
 * @param {any} next - The `next` parameter is a function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically used when you want to move to the
 * next middleware function after completing some operations in the current middleware function.
 * @returns In this code snippet, if the companys is not found, a response with a status code of 400
 * and a JSON object containing an error message will be returned. If the companys is found, the
 * `next()` function will be called, indicating that the middleware has successfully validated the
 * route and the request can proceed to the next middleware or route handler.
 */

export const validateRouteGet = async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const companyFound = await companyModel.findByPk(id);
    if(!companyFound){
        res.status(400).json({ error: 'Compañía no encontrada'});
        return;
    }
    next();
}

/**
 * The function validates the request body for a route post request, checking if the name and
 * description fields are present and if the name already exists in the database.
 * @param {any} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {any} res - The `res` parameter is the response object that is used to send the response back
 * to the client. It contains methods and properties that allow you to set the status code, headers,
 * and send the response body.
 * @param {any} next - The `next` parameter is a function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically used when you want to move to the
 * next middleware function after performing some validation or processing in the current middleware
 * function.
 * @returns nothing.
 */
//hazme una constate llamada NITvalidation que permita solo numeros, con longitud maxima de 14 y un solo guión

export const NITvalidation = /^\d{5,10}-\d$/;
export const phoneLongValidation = /^[0-9]{10}$/; 
export const validateRoutePost = async (req:any, res: any, next: any) => {
    const {name, nit, email, address, phone } = req.body;
    
  let errores = validarSinEspacios({nit, email, phone});
  if (Object.keys(errores).length > 0) {
        res.status(400).json(errores);
        return;
    } 
  let erroresSpace = validarSoloEspacios({name, nit, email, address, phone});
  if (Object.keys(erroresSpace).length > 0) {
        res.status(400).json(erroresSpace);
        return;
    }
  let erroresNumbers = validarSoloNumeros({nit, phone});
  if (Object.keys(erroresNumbers).length > 0) {
        res.status(400).json(erroresNumbers);
        return;
    }
  let erroresLetter = validarSoloLetras({name});
    if (Object.keys(erroresLetter).length > 0) {
        res.status(400).json(erroresLetter);
        return;
    }
    
    
    if (!name){
        res.status(400).json({ error: 'El nombre es requerido'});
        return;
    }
    if (!nit){
        res.status(400).json({ error: 'El NIT es requerido'});
        return;
    }
    if (nit){
        if(NITvalidation.test(nit) === false){
            res.status(400).json({ error: 'El NIT no es valido ejemplo:00000000-0' });
            return;
        }
    }
    if (nit){
        const companyFound = await companyModel.findOne({where: {nit}});
        if( companyFound){
            res.status(400).json({ error: 'El NIT ya existe'});
            return;
        }
        
    }
    if (!email){
        res.status(400).json({ error: 'El correo es requerido'});
        return;
    }
    if(emailValidation.test(email) === false){
        res.status(400).json({ error: 'El correo no es valido' });
        return;
    }
    if (!address){
        res.status(400).json({ error: 'La dirección es requerida'});
        return;
    }
    if (!phone){
        res.status(400).json({ error: 'El teléfono es requerido'});
        return;
    }
    if(phoneLongValidation.test(phone) === false){
        res.status(400).json({ error: 'El teléfono no es valido' });
        return;
    }

    next();
} 

/**
 * The function validates the request body for a PUT route, checking if the name and description fields
 * are present and if the name already exists in the database.
 * @param {any} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {any} res - The `res` parameter is the response object that is used to send the response back
 * to the client. It contains methods and properties that allow you to set the status code, headers,
 * and send the response body.
 * @param {any} next - The `next` parameter is a function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically used when you want to move to the
 * next middleware function after performing some validation or processing in the current middleware
 * function.
 * @returns nothing.
 */



export const validateRoutePut = async (req: any, res: any, next: any) => {
    
    const { name, nit, email, address, phone } = req.body;
    let errores = validarSinEspacios({nit, email, phone});
  if (Object.keys(errores).length > 0) {
        res.status(400).json(errores);
        return;
    } 
  let erroresSpace = validarSoloEspacios({name, nit, email, address, phone});
  if (Object.keys(erroresSpace).length > 0) {
        res.status(400).json(erroresSpace);
        return;
    }
  let erroresNumbers = validarSoloNumeros({nit, phone});
  if (Object.keys(erroresNumbers).length > 0) {
        res.status(400).json(erroresNumbers);
        return;
    }
  let erroresLetter = validarSoloLetras({name});
    if (Object.keys(erroresLetter).length > 0) {
        res.status(400).json(erroresLetter);
        return;
    }
    
    if (!name){
        res.status(400).json({ error: 'El nombre es requerido'});
        return;
    }
    if (!nit){
        res.status(400).json({ error: 'El NIT es requerido'});
        return;
    }
    
    if (nit){
        if(NITvalidation.test(nit) === false){
            res.status(400).json({ error: 'El NIT no es valido ejemplo:00000000-0' });
            return;
        }
    }
    if (nit){
        const companyFound = await companyModel.findOne({where: {nit}});
        if( companyFound){
            res.status(400).json({ error: 'El NIT ya existe'});
            return;
        }
        
    }
    if (!email){
        res.status(400).json({ error: 'El correo es requerido'});
        return;
    }
    if (emailValidation.test(email) === false){
        res.status(400).json({ error: 'El correo no es valido'});
        return;
    }
    if (!address){
        res.status(400).json({ error: 'La dirección es requerida'});
        return;
    }
    if (!phone){
        res.status(400).json({ error: 'El teléfono es requerido'});
        return;
    }
    if (phoneLongValidation.test(phone) === false){
        res.status(400).json({ error: 'El teléfono no es valido' });
        return;
    }
    next();
}

/**
 * The function validates if a companys exists before allowing a route to be deleted.
 * @param {any} req - The `req` parameter is the request object that contains information about the
 * HTTP request being made, such as the request headers, request body, and request parameters.
 * @param {any} res - The `res` parameter is the response object that is used to send the response back
 * to the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, headers, and sending the response body.
 * @param {any} next - The `next` parameter is a function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically used when you want to move to the
 * next middleware function after performing some operations or validations in the current middleware
 * function.
 * @returns In this code snippet, if the companys is not found, a response with a status code of 400
 * and a JSON object containing an error message will be returned. If the companys is found, the
 * `next()` function will be called, indicating that the validation was successful and the next
 * middleware or route handler can be executed.
 */

export const validateRouteDelete = async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const companyFound = await companyModel.findByPk(id);
    if (!companyFound) {
        res.status(400).json({ error: 'Compañía no encontrada' });
        return;
    }
    next();
}
