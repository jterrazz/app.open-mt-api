import { AuthenticationRequiredClientError } from '@domain/error/client/authentication-required-client-error';
import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { createMockOfShopRepository } from '@domain/shop/__tests__/shop-repository.mock';
import { productControllerFactory } from '@adapters/controllers/product-controller';

const createMockOfArguments = () => {
    const mockOfModifyProductById = jest.fn();
    const mockOfCreateProduct = jest.fn();
    const mockOfShopRepository = createMockOfShopRepository();

    return {
        mockOfCreateProduct,
        mockOfModifyProductById,
        mockOfShopRepository,
    };
};

describe('controllers / product', () => {
    describe('modifyProduct()', () => {
        test('track request', async () => {
            // Given
            const {
                mockOfCreateProduct,
                mockOfModifyProductById,
                mockOfShopRepository,
            } = createMockOfArguments();
            const mockOfCtx = createMockOfInitiatedKoaContext();

            // When
            await productControllerFactory(
                mockOfModifyProductById,
                mockOfCreateProduct,
                mockOfShopRepository,
                jest.fn().mockReturnValue({}),
                jest.fn().mockReturnValue({}),
                jest.fn(),
                jest.fn(),
            )
                .modifyProduct(mockOfCtx)
                .catch(() => {});

            // Then
            expect(
                mockOfCtx.requestTracker.requestedModifyProduct,
            ).toHaveBeenCalledTimes(1);
        });

        test('fails if user is not authenticated', async () => {
            // Given
            const {
                mockOfCreateProduct,
                mockOfModifyProductById,
                mockOfShopRepository,
            } = createMockOfArguments();
            const mockOfCtx = createMockOfInitiatedKoaContext();

            // When
            const ft = () =>
                productControllerFactory(
                    mockOfModifyProductById,
                    mockOfCreateProduct,
                    mockOfShopRepository,
                    jest.fn().mockReturnValue({}),
                    jest.fn().mockReturnValue({}),
                    jest.fn(),
                    jest.fn(),
                ).modifyProduct(mockOfCtx);

            // Then
            await expect(ft).rejects.toThrow(AuthenticationRequiredClientError);
        });
    });
});
