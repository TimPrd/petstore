// @ts-ignore
import jwt_decode from 'jwt-decode';

export class Session {
    private readonly token: string;

    constructor(token: string) {
        this.token = token;
    }

    private decodeToken(): { id, iat, exp } {
        if (this.token)
            return jwt_decode(this.token);
    }

    public get userId(): string {
        return this.decodeToken()?.id;
    }

    public get jwt(): string {
        return this.token;
    }
}