import { AuthenticationRequiredClientError } from '@domain/error/client/authentication-required-client-error';
import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { createShopControllerFactory } from '@adapters/controllers/shop/create-shop.controller';

const createMockOfArgs = () => {
    return {
        mockOfCreateShop: jest.fn().mockResolvedValue({}),
        mockOfDeserializer: jest.fn().mockResolvedValue({}),
        mockOfSerializer: jest.fn(),
    };
};

describe('createShopController()', () => {
    test('calls a tracker event', async () => {
        // Given
        const { mockOfCreateShop, mockOfDeserializer, mockOfSerializer } =
            createMockOfArgs();
        const mockOfCtx = createMockOfInitiatedKoaContext({}, true);

        // When
        await createShopControllerFactory(
            mockOfCreateShop,
            mockOfDeserializer,
            mockOfSerializer,
        )(mockOfCtx);

        // Then
        expect(
            mockOfCtx.requestTracker.requestedCreateShop,
        ).toHaveBeenCalledTimes(1);
    });

    test('fails if user is not authenticated', async () => {
        // Given
        const { mockOfCreateShop, mockOfDeserializer, mockOfSerializer } =
            createMockOfArgs();
        const mockOfCtx = createMockOfInitiatedKoaContext({}, false);

        // When
        const ft = () =>
            createShopControllerFactory(
                mockOfCreateShop,
                mockOfDeserializer,
                mockOfSerializer,
            )(mockOfCtx);

        // Then
        await expect(ft).rejects.toThrow(AuthenticationRequiredClientError);
    });
});
