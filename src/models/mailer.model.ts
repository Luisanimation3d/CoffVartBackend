import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL || 'coffvart@gmail.com',
        pass: process.env.SECRET_PASSWORD || 'qyfn aotw nlnq eroa',
    },
})

transporter.verify().then(() => {
    console.log('Ready for send emails');
})