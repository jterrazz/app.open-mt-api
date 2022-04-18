import { AuthenticationRequiredError } from '@domain/error/client/authentication-required-error';
import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { productControllerFactory } from '@adapters/controllers/product-controller';

jest.mock('../../serializers/product/modify-product-koa-serializer', () => ({
    deserializeModifyProductKoaRequest: jest.fn().mockReturnValue({}),
    serializeModifyProductKoaResponse: jest.fn(),
}));

const mockOfModifyProductById = jest.fn();

describe('controllers / product', () => {
    describe('modifyProduct()', () => {
        // TODO Test tracker called

        test('fails if user is not authenticated', async () => {
            // Given
            const mockOfCtx = createMockOfInitiatedKoaContext();

            // When
            const ft = () =>
                productControllerFactory(mockOfModifyProductById).modifyProduct(
                    mockOfCtx,
                );

            // Then
            await expect(ft).rejects.toThrow(AuthenticationRequiredError);
        });
    });
});
