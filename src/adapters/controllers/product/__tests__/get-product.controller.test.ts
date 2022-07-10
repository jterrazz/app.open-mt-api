import { NotFoundClientError } from '@domain/error/client/not-found-client-error';
import { createMockOfInitiatedKoaContext } from '@infrastructure/webserver/__tests__/initiated-koa-context.mock';
import { createMockOfProductRepository } from '@domain/product/__mocks__/product.repository.mock';
import {
    deserializeGetProductKoaRequest,
    getProductControllerFactory,
} from '@adapters/controllers/product/get-product.controller';

const mockOfCtx = createMockOfInitiatedKoaContext({
    params: {
        productId: '42',
    },
});

describe('deserializeGetProductKoaRequest()', () => {
    test('gets the productId from params', async () => {
        // When
        const productId = deserializeGetProductKoaRequest(mockOfCtx);

        // Then
        expect(productId).toEqual(42);
    });
});

describe('getProductController()', () => {
    test('calls a tracker event', async () => {
        // Given
        const mockOfProductRepository = createMockOfProductRepository();

        // When
        await getProductControllerFactory(mockOfProductRepository)(mockOfCtx);

        // Then
        expect(
            mockOfCtx.requestTracker.requestedGetProduct,
        ).toHaveBeenCalledTimes(1);
    });

    test('returns 404 when not finding a product', async () => {
        // Given
        const mockOfProductRepository = createMockOfProductRepository({
            findByProductId: jest.fn().mockResolvedValue(null),
        });

        // When
        const ft = () =>
            getProductControllerFactory(mockOfProductRepository)(mockOfCtx);

        // Then
        await expect(ft).rejects.toThrow(NotFoundClientError);
    });
});
