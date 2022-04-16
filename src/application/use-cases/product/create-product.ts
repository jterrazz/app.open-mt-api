import { IProductRepository } from '@domain/product/product-repository';
import { ITrackerRepository } from '@domain/tracker/tracker-repository';
import { ProductEntity } from '@domain/product/product-entity';

export const createNewProductFactory = (
    productRepository: IProductRepository,
    tracker: ITrackerRepository,
) => {
    return async (
        product: Pick<
            ProductEntity,
            'priceCentsAmount' | 'priceCurrency' | 'name'
        >,
    ) => {
        tracker.requestedCreateNewProduct();

        return productRepository.persist(product);
    };
};
