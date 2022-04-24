import { ClientError } from '@domain/error/client/client-error';
import { StatusCodes } from 'http-status-codes';

export class ForbiddenClientError extends ClientError {
    constructor(publicMessage?: string) {
        publicMessage ||= 'forbidden request';

        super(StatusCodes.FORBIDDEN, publicMessage);
    }
}
