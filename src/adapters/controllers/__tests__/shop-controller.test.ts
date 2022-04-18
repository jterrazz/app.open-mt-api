import { AuthenticationRequiredError } from '@domain/error/client/authentication-required-error';
import { NotFoundError } from '@domain/error/client/not-found-error';
import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { shopControllerFactory } from '@adapters/controllers/shop-controller';

jest.mock('../../serializers/shop/create-shop-koa-serializer', () => ({
    deserializeCreateShopKoaRequest: jest.fn().mockReturnValue({}),
    serializeCreateShopKoaResponse: jest.fn(),
}));

jest.mock('../../serializers/shop/get-shop-koa-serializer', () => ({
    deserializeGetShopKoaRequest: jest.fn().mockReturnValue({}),
    serializeGetShopKoaResponse: jest.fn(),
}));

const createMockOfArgs = () => {
    const mockOfCreateShop = jest.fn();
    const mockOfGetShop = jest.fn();
    const mockOfCtx = createMockOfInitiatedKoaContext();

    return {
        mockOfCreateShop,
        mockOfCtx,
        mockOfGetShop,
    };
};

describe('controllers / shop', () => {
    describe('createShop()', () => {
        // TODO Test tracker called

        test('fails if user is not authenticated', async () => {
            // Given
            const { mockOfCreateShop, mockOfGetShop, mockOfCtx } =
                createMockOfArgs();
            mockOfGetShop.mockReturnValue(null);

            // When
            const ft = () =>
                shopControllerFactory(
                    mockOfCreateShop,
                    mockOfGetShop,
                ).createShop(mockOfCtx);

            // Then
            await expect(ft).rejects.toThrow(AuthenticationRequiredError);
        });
    });

    describe('getShop()', () => {
        // TODO Test tracker called

        test('fails if no shop is found', async () => {
            // Given
            const { mockOfCreateShop, mockOfGetShop, mockOfCtx } =
                createMockOfArgs();
            mockOfGetShop.mockReturnValue(null);

            // When
            const ft = () =>
                shopControllerFactory(mockOfCreateShop, mockOfGetShop).getShop(
                    mockOfCtx,
                );

            // Then
            await expect(ft).rejects.toThrow(NotFoundError);
        });
    });
});
