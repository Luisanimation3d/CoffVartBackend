import { supplierModel } from "../models/suppliers.model";
import { NITvalidation, phoneLongValidation } from "./companys.middlewares";
import { validarSinEspacios, validarSoloEspacios, validarSoloLetras } from "./globalValidations.middlewares";

/**
 * The function validates if a permission exists before proceeding to the next middleware.
 * @param {any} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {any} res - The `res` parameter is the response object. It is used to send the response back
 * to the client.
 * @param {any} next - The `next` parameter is a function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically used when you want to move to the
 * next middleware function after completing some operations in the current middleware function.
 * @returns In this code snippet, if the permission is not found, a response with a status code of 400
 * and a JSON object containing an error message will be returned. If the permission is found, the
 * `next()` function will be called, indicating that the middleware has successfully validated the
 * route and the request can proceed to the next middleware or route handler.
 */

export const validateRouteGet = async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const supplierFound = await supplierModel.findByPk(id);
    if (!supplierFound) {
        res.status(400).json({ error: 'Proveedor no encontrado' });
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

export const validateRoutePost = async (req: any, res: any, next: any) => {
    const { name, nit, coffeType, address, phone, quality } = req.body;
    let errores = validarSinEspacios({nit, phone});
    if (Object.keys(errores).length > 0) {
        res.status(400).json(errores);
        return;
    }
    let erroresSpace = validarSoloEspacios({name, nit, coffeType, address, phone, quality});
    if (Object.keys(erroresSpace).length > 0) {
        res.status(400).json(erroresSpace);
        return;
    }
    /*let erroresNumbers = validarSoloNumeros({phone});
    if (Object.keys(erroresNumbers).length > 0) {
        res.status(400).json(erroresNumbers);
        return;
    }*/
    let erroresLetter = validarSoloLetras({ coffeType, quality});
    if (Object.keys(erroresLetter).length > 0) {
        res.status(400).json(erroresLetter);
        return;
    }
    if (!name) {
        res.status(400).json({ error: 'El nombre es requerido' });
        return;
    }
    if (!nit) {
        res.status(400).json({ error: 'El NIT es requerido' });
        return;
    }
    if (nit) {
        const supplierFound = await supplierModel.findOne({ where: { nit } });
        if (supplierFound) {
            res.status(400).json({ error: 'El NIT ya está registrado' });
            return;
        }
    }
    if (NITvalidation.test(nit) === false) {
        res.status(400).json({ error: 'El NIT no es valido example:00000000-0' });
        return;
    }

    if(!coffeType){
        res.status(400).json({ error: 'El tipo de café es requerido' });
        return;
    }
    if (!address) {
        res.status(400).json({ error: 'La dirección es requerida' });
        return;
    }
    if (!phone) {
        res.status(400).json({ error: 'El teléfono es requerido' });
        return;
    }
    if (!quality) {
        res.status(400).json({ error: 'La calidad es requerida' });
        return;
    }
    if(phoneLongValidation.test(phone) === false){
        res.status(400).json({ error: 'El teléfono no es valido' });
        return;
    }
    next();
};


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
    const { name, coffeType, address, phone, quality} = req.body;
    let errores = validarSinEspacios({phone});
    if (Object.keys(errores).length > 0) {
        res.status(400).json(errores);
        return;
    }
    let erroresSpace = validarSoloEspacios({name, coffeType, address, phone, quality});
    if (Object.keys(erroresSpace).length > 0) {
        res.status(400).json(erroresSpace);
        return;
    }
    /*let erroresNumbers = validarSoloNumeros({nit, phone});
    if (Object.keys(erroresNumbers).length > 0) {
        res.status(400).json(erroresNumbers);
        return;
    }*/
    let erroresLetter = validarSoloLetras({coffeType, quality});
    if (Object.keys(erroresLetter).length > 0) {
        res.status(400).json(erroresLetter);
        return;
    }
    if (!name) {
        res.status(400).json({ error: 'El nombre es requerido' });
        return;
    }

    if(!coffeType){
        res.status(400).json({ error: 'El tipo de café es requerido' });
        return;
    }
    if (!address) {
        res.status(400).json({ error: 'La dirección es requerida' });
        return;
    }
    if (!phone) {
        res.status(400).json({ error: 'El teléfono es requerido' });
        return;
    }
    if(phoneLongValidation.test(phone) === false){
        res.status(400).json({ error: 'El teléfono no es valido' });
        return;
    }
    if (!quality) {
        res.status(400).json({ error: 'La calidad es requerida' });
        return;
    }
    
    next();
};

/**
 * The function validates if a permission exists before allowing a route to be deleted.
 * @param {any} req - The `req` parameter is the request object that contains information about the
 * HTTP request being made, such as the request headers, request body, and request parameters.
 * @param {any} res - The `res` parameter is the response object that is used to send the response back
 * to the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, headers, and sending the response body.
 * @param {any} next - The `next` parameter is a function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically used when you want to move to the
 * next middleware function after performing some operations or validations in the current middleware
 * function.
 * @returns In this code snippet, if the permission is not found, a response with a status code of 400
 * and a JSON object containing an error message will be returned. If the permission is found, the
 * `next()` function will be called, indicating that the validation was successful and the next
 * middleware or route handler can be executed.
 */

export const validateRouteDelete = async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const supplierFound = await supplierModel.findByPk(id);
    if (!supplierFound) {
        res.status(400).json({ error: 'Proveedor no encontrado' });
        return;
    }
    next();
}