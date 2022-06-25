import { ClientError } from '@domain/error/client/client-error';
import { StatusCodes } from 'http-status-codes';

export class AuthenticationRequiredClientError extends ClientError {
    constructor(publicMessage?: string) {
        publicMessage ||= 'authentication required';

        super(StatusCodes.UNAUTHORIZED, publicMessage);
    }
}
