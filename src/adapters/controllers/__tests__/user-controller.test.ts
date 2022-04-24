import { NotFoundClientError } from '@domain/error/client/not-found-client-error';
import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { userControllerFactory } from '@adapters/controllers/user-controller';

const createMockOfArgs = () => {
    const mockOfGetUserPublicProfile = jest.fn().mockReturnValue({});
    const mockOfCtx = createMockOfInitiatedKoaContext();

    return {
        mockOfCtx,
        mockOfGetUserPublicProfile,
    };
};

describe('controllers / users', () => {
    describe('getPublicProfile()', () => {
        test('tracks request', async () => {
            // Given
            const { mockOfCtx, mockOfGetUserPublicProfile } =
                createMockOfArgs();

            // When
            await userControllerFactory(
                mockOfGetUserPublicProfile,
                jest.fn().mockReturnValue({}),
                jest.fn(),
            ).getPublicProfile(mockOfCtx);

            // Then
            await expect(
                mockOfCtx.requestTracker.requestedGetUser,
            ).toHaveBeenCalledTimes(1);
        });

        test('fails if no user is found', async () => {
            // Given
            const { mockOfCtx, mockOfGetUserPublicProfile } =
                createMockOfArgs();
            mockOfGetUserPublicProfile.mockReturnValue(null);

            // When
            const ft = () =>
                userControllerFactory(
                    mockOfGetUserPublicProfile,
                    jest.fn().mockReturnValue({}),
                    jest.fn(),
                ).getPublicProfile(mockOfCtx);

            // Then
            await expect(ft).rejects.toThrow(NotFoundClientError);
        });
    });
});
