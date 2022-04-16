import {
    IRepositoryFindByHandle,
    IRepositoryFindByID,
    IRepositoryMerge,
} from '../repository';
import { ShopEntity } from '@domain/shop/shop-entity';

export interface IShopRepository {
    persist: (
        persistShopParams: ShopEntity, // TODO Pick here
        ownerUserId: number,
    ) => Promise<ShopEntity>; // TODO Remove those generic types and add PICK
    findByHandle: IRepositoryFindByHandle<ShopEntity>;
    findByOwnerId: IRepositoryFindByID<ShopEntity>;
    merge: IRepositoryMerge<ShopEntity>;
}
