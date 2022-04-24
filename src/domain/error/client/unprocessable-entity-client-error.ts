import * as util from 'util';
import { ClientError } from '@domain/error/client/client-error';
import { StatusCodes } from 'http-status-codes';

export class UnprocessableEntityClientError extends ClientError {
    constructor(fields: string[], publicMessage?: string) {
        publicMessage ||= `bad fields ${util.inspect(fields)}`;

        super(StatusCodes.UNPROCESSABLE_ENTITY, publicMessage, {
            fields,
        });
    }
}
