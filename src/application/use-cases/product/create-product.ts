import { IProductRepository } from '@domain/product/product.repository';
import { ProductEntity } from '@domain/product/product.entity';

export type CreateProduct = (
    product: Pick<ProductEntity, 'priceCentsAmount' | 'priceCurrency' | 'name'>,
    shopId: number,
) => Promise<ProductEntity>;

export const createProductFactory = (
    productRepository: IProductRepository,
): CreateProduct => {
    return async (product, shopId) => {
        return productRepository.add(product, shopId);
    };
};
