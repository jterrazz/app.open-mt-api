import { CurrencyEntity } from '@domain/currency/currency.entity';
import { ShopEntity } from '@domain/shop/shop.entity';

export interface ProductEntity {
    id: number;
    name: string;
    priceCentsAmount: number;
    priceCurrency: CurrencyEntity;
    shop?: ShopEntity;
    shopId: number;
}
