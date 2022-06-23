import { BrokenOneToOneRelationServerError } from '@domain/error/server/broken-one-to-one-relation-server-error';
import { DuplicatedFieldServerError } from '@domain/error/server/duplicated-field-server-error';
import { NotFoundServerError } from '@domain/error/server/not-found-server-error';
import { PrismaErrors } from '@infrastructure/orm/prisma/prisma-errors';
import Prisma from 'prisma';

export const mapPrismaErrorToDomain = (
    prismaError: Prisma.PrismaClientKnownRequestError,
) => {
    switch (prismaError.code) {
        case PrismaErrors.UNIQUE_CONSTRAINT_ON_FIELD:
            return new DuplicatedFieldServerError(prismaError.meta?.target[0]);
        case PrismaErrors.REQUIRED_RELATION_VIOLATED:
            return new BrokenOneToOneRelationServerError(
                prismaError.meta?.relation_name,
            );
        case PrismaErrors.OPERATION_FAILED_RECORD_NOT_FOUND:
            return new NotFoundServerError();
    }

    return prismaError;
};
