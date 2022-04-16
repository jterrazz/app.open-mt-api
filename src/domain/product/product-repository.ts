import {
    IRepositoryFindByID,
    IRepositoryMerge,
    IRepositoryPersist,
} from '../repository';
import { ProductEntity } from './product-entity';

export interface IProductRepository {
    persist: (
        product: Pick<
            ProductEntity,
            'priceCentsAmount' | 'priceCurrency' | 'name'
        >,
    ) => Promise<ProductEntity>;
    merge: IRepositoryMerge<ProductEntity>;
    findById: IRepositoryFindByID<ProductEntity>;
}
