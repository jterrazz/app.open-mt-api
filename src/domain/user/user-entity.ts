import { ShopEntity } from '@domain/shop/shop-entity';

export type UserEntity = {
    id: number;
    email: string;
    handle: string;
    firstName: string;
    lastName: string;
    hashedPassword: string;
};
