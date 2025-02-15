export interface ITokenResult {
    authTime: string
    expirationTime: string
    issuedAtTime: string
    signInProvider: string | null
    token: string
}

export interface IUser {
    uid: string
    displayName: string
    photoURL: string
    email: string
    tokenResult: ITokenResult
}