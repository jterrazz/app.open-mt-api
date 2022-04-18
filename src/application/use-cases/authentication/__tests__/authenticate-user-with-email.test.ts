import { AuthenticationRequiredError } from '@domain/error/client/authentication-required-error';
import { authenticateUserWithEmailFactory } from '@application/use-cases/authentication/authenticate-user-with-email';
import { createMockOfLogger } from '@application/contracts/__tests__/logger.mock';
import { createMockOfUser } from '@domain/user/__tests__/user-entity.mock';
import { createMockOfUserRepository } from '@domain/user/__tests__/user-repository.mock';

const createMockOfArgs = () => {
    const mockOfLogger = createMockOfLogger();
    const mockOfUserRepository = createMockOfUserRepository();
    const mockOfPasswordChecker = jest.fn().mockReturnValue(true);

    return {
        mockOfLogger,
        mockOfPasswordChecker,
        mockOfUserRepository,
    };
};

describe('use-cases / authenticateUserWithEmail()', () => {
    test('authenticates a valid email:password credential', async () => {
        // Given
        const { mockOfLogger, mockOfPasswordChecker, mockOfUserRepository } =
            createMockOfArgs();

        // When
        const result = await authenticateUserWithEmailFactory(
            mockOfLogger,
            mockOfUserRepository,
            mockOfPasswordChecker,
        )('', '');

        // Then
        expect(result).toEqual(createMockOfUser());
    });

    test('rejects a bad email with an unauthorized error', async () => {
        // Given
        const { mockOfLogger, mockOfPasswordChecker } = createMockOfArgs();
        const mockOfUserRepository = createMockOfUserRepository({
            findByEmail: jest.fn().mockReturnValue(null),
        });

        // When
        const ft = () =>
            authenticateUserWithEmailFactory(
                mockOfLogger,
                mockOfUserRepository,
                mockOfPasswordChecker,
            )('', '');

        // Then
        await expect(ft).rejects.toThrow(AuthenticationRequiredError);
    });

    test('rejects a bad password with an unauthorized error', async () => {
        // Given
        const { mockOfLogger, mockOfUserRepository } = createMockOfArgs();
        const mockOfPasswordChecker = jest.fn().mockReturnValue(false);

        // When
        const ft = () =>
            authenticateUserWithEmailFactory(
                mockOfLogger,
                mockOfUserRepository,
                mockOfPasswordChecker,
            )('', '');

        // Then
        await expect(ft).rejects.toThrow(AuthenticationRequiredError);
    });
});
