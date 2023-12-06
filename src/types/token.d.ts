interface userToken {
    id: number,
    name: string,
    email: string,
    iat: number,
    exp: number
}

interface userRecoveryPassword {
    id: number
}

export interface tokenData {
    user: userToken
}

export interface recoveryPasswordTokenData {
    user: userRecoveryPassword
}

type JwtPayloadWithTokenData = Omit<tokenData, 'id'> & JwtPayload;

type JwtPayloadWithRecoveryPasswordTokenData = Omit<recoveryPasswordTokenData, 'id'> & JwtPayload;

