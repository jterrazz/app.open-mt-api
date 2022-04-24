import { AuthenticationRequiredError } from '@domain/error/client/authentication-required-error';
import { NotFoundError } from '@domain/error/client/not-found-error';
import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { shopControllerFactory } from '@adapters/controllers/shop-controller';

const createMockOfArgs = () => {
    const mockOfCreateShop = jest.fn().mockResolvedValue({});
    const mockOfGetShop = jest.fn().mockResolvedValue({});

    return {
        mockOfCreateShop,
        mockOfGetShop,
    };
};

describe('controllers / shop', () => {
    describe('createShop()', () => {
        test('tracks requests', async () => {
            // Given
            const { mockOfCreateShop, mockOfGetShop } = createMockOfArgs();
            const mockOfCtx = createMockOfInitiatedKoaContext({}, true);

            // When
            await shopControllerFactory(
                mockOfCreateShop,
                mockOfGetShop,
                jest.fn().mockReturnValue({}),
                jest.fn().mockReturnValue({}),
                jest.fn(),
                jest.fn(),
            ).createShop(mockOfCtx);

            // Then
            expect(
                mockOfCtx.requestTracker.requestedCreateShop,
            ).toHaveBeenCalledTimes(1);
        });

        test('fails if user is not authenticated', async () => {
            // Given
            const { mockOfCreateShop, mockOfGetShop } = createMockOfArgs();
            const mockOfCtx = createMockOfInitiatedKoaContext({}, false);

            // When
            const ft = () =>
                shopControllerFactory(
                    mockOfCreateShop,
                    mockOfGetShop,
                    jest.fn().mockReturnValue({}),
                    jest.fn().mockReturnValue({}),
                    jest.fn(),
                    jest.fn(),
                ).createShop(mockOfCtx);

            // Then
            await expect(ft).rejects.toThrow(AuthenticationRequiredError);
        });
    });

    describe('getShop()', () => {
        test('tracks request', async () => {
            // Given
            const { mockOfCreateShop, mockOfGetShop } = createMockOfArgs();
            const mockOfCtx = createMockOfInitiatedKoaContext();

            // When
            await shopControllerFactory(
                mockOfCreateShop,
                mockOfGetShop,
                jest.fn().mockReturnValue({}),
                jest.fn().mockReturnValue({}),
                jest.fn(),
                jest.fn(),
            ).getShop(mockOfCtx);

            // Then
            expect(
                mockOfCtx.requestTracker.requestedGetShop,
            ).toHaveBeenCalledTimes(1);
        });

        test('fails if no shop is found', async () => {
            // Given
            const { mockOfCreateShop, mockOfGetShop } = createMockOfArgs();
            const mockOfCtx = createMockOfInitiatedKoaContext();
            mockOfGetShop.mockReturnValue(null);

            // When
            const ft = () =>
                shopControllerFactory(
                    mockOfCreateShop,
                    mockOfGetShop,
                    jest.fn().mockReturnValue({}),
                    jest.fn().mockReturnValue({}),
                    jest.fn(),
                    jest.fn(),
                ).getShop(mockOfCtx);

            // Then
            await expect(ft).rejects.toThrow(NotFoundError);
        });
    });
});
