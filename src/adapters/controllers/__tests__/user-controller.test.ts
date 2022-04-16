import { NotFoundError } from '@domain/error/client/not-found-error';

const mockOfGetUserPublicProfileFactory = jest.fn();
jest.mock(
    '../../../application/use-cases/user/get-user-public-profile',
    () => ({
        getUserPublicProfileFactory: mockOfGetUserPublicProfileFactory,
    }),
);

import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { createMockOfLogger } from '@application/contracts/__tests__/logger.mock';
import { createMockOfUserRepository } from '@domain/user/__tests__/user-repository.mock';
import { userControllerFactory } from '@adapters/controllers/user-controller';

describe('user-controller', () => {
    const userController = userControllerFactory(
        createMockOfLogger(),
        createMockOfUserRepository(),
    );
    const mockOfCtx = createMockOfInitiatedKoaContext({
        params: { userHandle: '' },
    });

    describe('getPublicProfile()', () => {
        test('fails if no user is found', async () => {
            // Given
            mockOfGetUserPublicProfileFactory.mockReturnValue(async () => null);

            // When
            const ft = () => userController.getPublicProfile(mockOfCtx);

            // Then
            await expect(ft).rejects.toThrow(NotFoundError);
        });
    });
});
