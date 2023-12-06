import {transporter} from "../models/mailer.model";
import {Request, Response} from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import {UserModelType} from "user";
import {userModel} from "../models/users.model";
import * as process from "process";
import bcrypt from "bcrypt";
import { JwtPayloadWithRecoveryPasswordTokenData } from "token";

export const sendEmail = async (req: Request, res: Response) => {

    try {
        const pathImage = './src/assets/burdeoLogo.png';
        const image = fs.readFileSync(pathImage, {encoding: 'base64'});

        const {email} = req.body;

        if (!email) {
            return res.status(400).json({msg: 'Falta el correo electrónico'});
        }

        const user: UserModelType | null = await userModel.findOne({where: {email}});

        if (!user) {
            return res.status(400).json({msg: 'Email not found'});
        }

        const token = jwt.sign({
            user: {
                id: user.id,
            }
        }, process.env.SECRET_KEY || "Klingon", {expiresIn: Math.floor(Date.now() / 1000) + 60 * 60});
        await transporter.sendMail({
            from: 'micorreo@example.com',
            to: email,
            subject: 'Prueba de correo',
            html: `
        <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
          <div style="background: #E0D6D6; width: 100%; max-width: 500px;">
            <header style="width:100%; height: 50px; overflow: hidden; background: #D6CAB0; display: flex; justify-content: center; align-items: center; padding: 0;">
              <img src="cid:burdeoLogo" alt="burdeoLogo" style="width: auto; height: 130%; object-fit: cover;">
            </header>
            <main style="width: 100%; padding: 1rem;">
              <p>
                Estimado/a <strong>Luis</strong>,<br>
                Hemos recibido tu solicitud de cambio de contraseña.<br>
                <br>
                Para continuar con el proceso, haz click en el siguiente botón:
                <div style="display: flex; justify-content: center; align-items: center; margin: 1rem 0;">
                  <a href="http://localhost:5173/recoverypassword/${token}" style="text-decoration: none; text-align: center; padding: .5rem 1rem; background-color: #9F212F; color: #D6CAB0; font-weight: bolder; border-radius: .5rem;">
                    Cambiar Contraseña
                  </a>
                </div>
                Si no has solicitado este cambio, ignora este correo.<br>
                <br>
                Saludos,<br>
                Equipo Burdeo
              </p>
            </main>
            <footer>
              <p style="text-align: center; font-size: .8rem; color: #9F212F;">
                Este correo fue enviado automáticamente, por favor no responder.
              </p>
              <div style="width: 100%; background-color: #9F212F; height: 50px; display: flex; justify-content: center; align-items: center;">
                <p style="text-align: center; font-size: .8rem; color: #D6CAB0; font-weight: bolder;">
                  © 2021 Burdeo. Todos los derechos reservados.
                </p>
              </div>
            </footer>
          </div>
        </div>
      `,
            attachments: [{
                filename: 'burdeoLogo.png',
                content: image,
            }],
        });
        res.status(200).json({msg: 'Email sent'});
    } catch (e) {
        console.log(e);
    }
};


export const recoveryPassword = async (req: Request, res: Response) => {
    try{
        const {token, password} = req.body;
        if(!token || !password){
            return res.status(400).json({msg: 'Bad request'});
        }
        const decodedToken : JwtPayloadWithRecoveryPasswordTokenData = jwt.verify(token, process.env.SECRET_KEY || "Klingon");
        if(!decodedToken.user.id){
            return res.status(400).json({msg: 'Bad request'});
        }
        const user = await userModel.findOne({where: {id: decodedToken.user.id}});

        if(!user){
            return res.status(400).json({msg: 'Bad request'});
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        await user.update({password: passwordHash});
    }catch (e) {
        console.log(e);
        return res.status(500).json({msg: 'Internal server error'});
    }
}