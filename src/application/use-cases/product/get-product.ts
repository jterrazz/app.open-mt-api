import { IProductRepository } from '@domain/product/product.repository';
import { ProductEntity } from '@domain/product/product.entity';

export type GetProduct = (productId: number) => Promise<ProductEntity | null>;

export const getProductFactory = (
    productRepository: IProductRepository,
): GetProduct => {
    return (productId) => {
        return productRepository.findByProductId(productId);
    };
};
