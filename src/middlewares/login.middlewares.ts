import { Request, Response, NextFunction } from 'express';

/**
 * The loginMiddlewares function validates the email and password fields in a request body and returns
 * an error response if they are missing or invalid.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @param {NextFunction} next - The `next` parameter is a function that is called to pass control to
 * the next middleware function in the chain. It is typically used to move to the next middleware
 * function after the current middleware function has completed its tasks.
 * @returns In this code, if any of the validation checks fail, a response with an error message is
 * sent and the function returns. If all the validation checks pass, the function calls the `next()`
 * function to proceed to the next middleware or route handler.
*/
export const emailValidation = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
export const loginMiddlewares = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try{
        
        if (!email || !password) {
            res.status(400).json({ error: 'Username and password are required' });
            return;
        }
        if(emailValidation.test(email) === false){
            res.status(400).json({ error: 'Email is not valid' });
            return;
        }
        next();
    }catch{
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
}