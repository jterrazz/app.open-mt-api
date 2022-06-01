import { AuthenticationRequiredClientError } from '@domain/error/client/authentication-required-client-error';
import { createMockOfInitiatedKoaContext } from '@infrastructure/webserver/__tests__/initiated-koa-context.mock';
import { modifyProductControllerFactory } from '@adapters/controllers/product/modify-product.controller';

const createMockOfArguments = () => {
    return {
        mockOfDeserializer: jest.fn().mockReturnValue({}),
        mockOfModifyProductById: jest.fn(),
        mockOfSerializer: jest.fn(),
    };
};

describe('modifyProductController()', () => {
    test('calls a tracker event', async () => {
        // Given
        const {
            mockOfModifyProductById,
            mockOfDeserializer,
            mockOfSerializer,
        } = createMockOfArguments();
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        await modifyProductControllerFactory(
            mockOfModifyProductById,
            mockOfDeserializer,
            mockOfSerializer,
        )(mockOfCtx).catch(() => {});

        // Then
        expect(
            mockOfCtx.requestTracker.requestedModifyProduct,
        ).toHaveBeenCalledTimes(1);
    });

    test('fails if user is not authenticated', async () => {
        // Given
        const {
            mockOfModifyProductById,
            mockOfDeserializer,
            mockOfSerializer,
        } = createMockOfArguments();
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        const ft = () =>
            modifyProductControllerFactory(
                mockOfModifyProductById,
                mockOfDeserializer,
                mockOfSerializer,
            )(mockOfCtx);

        // Then
        await expect(ft).rejects.toThrow(AuthenticationRequiredClientError);
    });
});
