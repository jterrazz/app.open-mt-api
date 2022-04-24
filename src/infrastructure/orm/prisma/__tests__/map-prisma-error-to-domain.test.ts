import { DuplicatedFieldServerError } from '@domain/error/server/duplicated-field-server-error';
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
});

// code: 'P2025',
//     clientVersion: '3.12.0',
//     meta: { cause: 'Record to update not found.' }
