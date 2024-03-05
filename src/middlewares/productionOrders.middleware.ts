import { productionOrderModel } from "../models/productionOrders.model";
import { validarNoNegativos } from "./globalValidations.middlewares";
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
    const productionOrderFound = await productionOrderModel.findByPk(id);
    if(!productionOrderFound){
        res.status(400).json({ error: 'productionOrder not found'});
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
    const {quantity } = req.body;
    /*let erroresNumbers ={};
    if(quantity){
        erroresNumbers = validarSoloNumeros(quantity);
    }else{
        erroresNumbers = {error: 'La cantidad es requerida'};
    }
    if(Object.keys(erroresNumbers).length > 0){
        res.status(400).json(erroresNumbers);
        return;
    }*/
    let erroresNegativos = validarNoNegativos(quantity);
    if(Object.keys(erroresNegativos).length > 0){
        res.status(400).json(erroresNegativos);
        return;
    }
    if(!quantity){
        res.status(400).json({ error: 'La cantidad es requerida' });
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
    const { quantity} = req.body;

    /*let erroresNumbers = validarSoloNumeros(quantity);
    if(Object.keys(erroresNumbers).length > 0){
        res.status(400).json(erroresNumbers);
        return;
    }*/
    let erroresNegativos = validarNoNegativos(quantity);
    if(Object.keys(erroresNegativos).length > 0){
        res.status(400).json(erroresNegativos);
        return;
    }
    if(!quantity){
        res.status(400).json({ error: 'La cantidad es requerida' });
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
    const productionOrderFound = await productionOrderModel.findByPk(id);
    if (!productionOrderFound) {
        res.status(400).json({ error: 'productionOrder not found' });
        return;
    }
    next();
}