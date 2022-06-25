import { ProductEntity } from './product.entity';

// TODO Rename all properties
export interface IProductRepository {
    add: (
        product: Pick<
            ProductEntity,
            'priceCentsAmount' | 'priceCurrency' | 'name'
        >,
        shopId: number,
    ) => Promise<ProductEntity>;
    update: (
        productId: number,
        product: Pick<
            ProductEntity,
            'priceCentsAmount' | 'priceCurrency' | 'name'
        >,
    ) => Promise<ProductEntity>;
    findByProductId: (productId: number) => Promise<ProductEntity | null>;
}
