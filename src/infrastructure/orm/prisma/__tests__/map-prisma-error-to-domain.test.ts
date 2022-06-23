import { BrokenOneToOneRelationServerError } from '@domain/error/server/broken-one-to-one-relation-server-error';
import { DuplicatedFieldServerError } from '@domain/error/server/duplicated-field-server-error';
import { NotFoundServerError } from '@domain/error/server/not-found-server-error';
import { mapPrismaErrorToDomain } from '@infrastructure/orm/prisma/map-prisma-error-to-domain';

describe('mapPrismaErrorToDomain()', () => {
    test('maps unique field constraint error', async () => {
        // Given
        const uniqueFieldConstraintError = {
            clientVersion: '3.10.0',
            code: 'P2002',
            meta: { target: ['handle'] },
        };

        // When
        const result = mapPrismaErrorToDomain(uniqueFieldConstraintError);

        // Then
        expect(result).toBeInstanceOf(DuplicatedFieldServerError);
        expect(result).toEqual({ field: 'handle' });
    });

    test('maps broken one to one relation error', async () => {
        // Given
        const brokenOneToOneRelationError = {
            clientVersion: '3.10.0',
            code: 'P2014',
            meta: { relation_name: 'user' },
        };

        // When
        const result = mapPrismaErrorToDomain(brokenOneToOneRelationError);

        // Then
        expect(result).toBeInstanceOf(BrokenOneToOneRelationServerError);
        expect(result).toEqual({ relationName: 'user' });
    });

    test('maps not found error', async () => {
        // Given
        const notFoundError = {
            clientVersion: '3.10.0',
            code: 'P2025',
        };

        // When
        const result = mapPrismaErrorToDomain(notFoundError);

        // Then
        expect(result).toBeInstanceOf(NotFoundServerError);
    });
});
