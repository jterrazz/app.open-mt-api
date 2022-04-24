import { DuplicatedFieldServerError } from '@domain/error/server/duplicated-field-server-error';
import { NotFoundClientError } from '@domain/error/client/not-found-client-error';
import { PrismaErrors } from '@infrastructure/orm/prisma/prisma-errors';
import Prisma from 'prisma';

// TODO Move
export class BrokeOneToOneRelationError {
    private relationName: string;
    constructor(relationName: string) {
        this.relationName = relationName;
    }
}

export const mapPrismaErrorToDomain = (
    prismaError: Prisma.PrismaClientKnownRequestError,
) => {
    switch (prismaError.code) {
        case PrismaErrors.UNIQUE_CONSTRAINT_ON_FIELD:
            return new DuplicatedFieldServerError(prismaError.meta?.target[0]);
        case PrismaErrors.REQUIRED_RELATION_VIOLATED: // TODO Test
            return new BrokeOneToOneRelationError(
                prismaError.meta?.relation_name,
            );
        case PrismaErrors.OPERATION_FAILED_RECORD_NOT_FOUND: // TODO Test
            return new NotFoundClientError(); // TODO Use an internal version of error since it's not public
    } // TODO Modify other naming to ClientError

    return prismaError;
};