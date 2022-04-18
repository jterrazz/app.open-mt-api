import { NotFoundError } from '@domain/error/client/not-found-error';
import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { createMockOfLogger } from '@application/contracts/__tests__/logger.mock';
import { createMockOfUserRepository } from '@domain/user/__tests__/user-repository.mock';
import { userControllerFactory } from '@adapters/controllers/user-controller';

jest.mock('../../serializers/user/get-user-koa-serializer', () => ({
    deserializeGetUserKoaRequest: jest.fn().mockReturnValue({}),
    serializeGetUserKoaResponse: jest.fn(),
}));

const createMockOfArgs = () => {
    const mockOfGetUserPublicProfile = jest.fn();
    const mockOfCtx = createMockOfInitiatedKoaContext();

    return {
        mockOfCtx,
        mockOfGetUserPublicProfile,
    };
};

describe('controllers / users', () => {
    describe('getPublicProfile()', () => {
        // TODO Test for tracker too

        test('fails if no user is found', async () => {
            // Given
            const { mockOfCtx, mockOfGetUserPublicProfile } =
                createMockOfArgs();
            mockOfGetUserPublicProfile.mockReturnValue(null);

            // When
            const ft = () =>
                userControllerFactory(
                    mockOfGetUserPublicProfile,
                ).getPublicProfile(mockOfCtx);

            // Then
            await expect(ft).rejects.toThrow(NotFoundError);
        });
    });
});
