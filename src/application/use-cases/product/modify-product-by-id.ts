import { Currency } from '@domain/currency/currency';
import { ForbiddenError } from '@domain/error/client/forbidden-error';
import { IProductRepository } from '@domain/product/product-repository';
import { IShopRepository } from '@domain/shop/shop-repository';
import { NotFoundError } from '@domain/error/client/not-found-error';
import { ProductEntity } from '@domain/product/product-entity';
import { UserEntity } from '@domain/user/user-entity';

type ModifyProductParams = {
    name?: string;
    priceCentsAmount?: number;
    priceCurrency?: Currency;
};

export const modifyProductByIdFactory = (
    productRepository: IProductRepository,
    shopRepository: IShopRepository,
) => {
    return async (
        authenticatedUser: UserEntity,
        productId: number,
        modifyProductParams: ModifyProductParams,
    ): Promise<ProductEntity> => {
        const [userShop, productEntity] = await Promise.all([
            shopRepository.findByOwnerId(authenticatedUser.id),
            productRepository.findById(productId),
        ]);

        if (!productEntity) {
            throw new NotFoundError('unknown product');
        }

        if (productEntity.shopId !== userShop?.id) {
            throw new ForbiddenError();
        }

        if (modifyProductParams.name !== undefined)
            productEntity.name = modifyProductParams.name;
        if (modifyProductParams.priceCurrency !== undefined)
            productEntity.priceCurrency = modifyProductParams.priceCurrency;
        if (modifyProductParams.priceCentsAmount !== undefined)
            productEntity.priceCentsAmount =
                modifyProductParams.priceCentsAmount;

        return productRepository.merge(productEntity);
    };
};
