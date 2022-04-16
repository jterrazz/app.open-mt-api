import { IShopRepository } from '@domain/shop/shop-repository';

export type GetShopResult = {
    handle: string;
    description: string | null;
    name: string;
};

export const getShopFactory = (shopRepository: IShopRepository) => {
    return async (shopHandle: string): Promise<GetShopResult | null> => {
        const shop = await shopRepository.findByHandle(shopHandle);

        return (
            shop && {
                description: shop.description,
                handle: shop.handle,
                name: shop.name,
            }
        );
    };
};
