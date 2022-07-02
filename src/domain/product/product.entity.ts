import { Currency } from '@domain/price/currency';
import { ShopEntity } from '@domain/shop/shop.entity';

export interface ProductEntity {
    id: number;
    name: string;
    priceCentsAmount: number;
    priceCurrency: Currency;
    shop?: ShopEntity;
    shopId: number;
}
