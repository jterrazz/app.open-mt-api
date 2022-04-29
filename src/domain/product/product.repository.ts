import { ProductEntity } from './product.entity';

export interface IProductRepository {
    persist: (
        product: Pick<
            ProductEntity,
            'priceCentsAmount' | 'priceCurrency' | 'name'
        >,
        shopId: number,
    ) => Promise<ProductEntity>;
    merge: (
        productId: number,
        product: Pick<
            ProductEntity,
            'priceCentsAmount' | 'priceCurrency' | 'name'
        >,
    ) => Promise<ProductEntity>;
    findByProductId: (productId: number) => Promise<ProductEntity | null>;
}
