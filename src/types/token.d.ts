import { Request } from 'express';

interface userToken {
    id: number,
    name: string,
    email: string,
    iat: number,
    exp: number
}

export interface tokenData {
    user: userToken
}

type JwtPayloadWithTokenData = Omit<tokenData, 'id'> & JwtPayload;