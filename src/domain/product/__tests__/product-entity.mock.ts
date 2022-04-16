import { ProductEntity } from '@domain/product/product-entity';

export const createMockOfProductEntity = (
    partialProduct: Partial<ProductEntity> = {},
): ProductEntity => ({
    id: 0,
    name: 'the_name',
    priceCentsAmount: 4200,
    priceCurrency: 'EUR',
    shopId: 0,
    ...partialProduct,
});
