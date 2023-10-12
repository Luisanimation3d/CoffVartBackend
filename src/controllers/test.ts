import {Response, Request} from 'express';

export function getTest(req: Request, res: Response){
    res.status(200).json({
        ok: true,
        msg: 'Todo bien',
        data: {
            nombre: 'Hola',
            edad: 20
        }
    })
}