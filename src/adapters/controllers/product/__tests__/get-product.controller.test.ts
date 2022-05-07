import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { getProductControllerFactory } from '@adapters/controllers/product/get-product.controller';

describe('getProductController()', () => {
    test('calls a tracker event', async () => {
        // Given
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        await getProductControllerFactory()(mockOfCtx);

        // Then
        expect(
            mockOfCtx.requestTracker.requestedGetProduct,
        ).toHaveBeenCalledTimes(1);
    });
});
