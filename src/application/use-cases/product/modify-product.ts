import { ForbiddenClientError } from '@domain/error/client/forbidden-client-error';
import { IProductRepository } from '@domain/product/product.repository';
import { IShopRepository } from '@domain/shop/shop.repository';
import { NotFoundClientError } from '@domain/error/client/not-found-client-error';
import { ProductEntity } from '@domain/product/product.entity';
import { UserEntity } from '@domain/user/user.entity';

export type ModifyProduct = (
    authenticatedUser: UserEntity,
    productId: number,
    modifyProductParams: Partial<
        Pick<ProductEntity, 'name' | 'priceCurrency' | 'priceCentsAmount'>
    >,
) => Promise<ProductEntity>;

export const modifyProductFactory = (
    productRepository: IProductRepository,
    shopRepository: IShopRepository,
): ModifyProduct => {
    return async (authenticatedUser, productId, modifyProductParams) => {
        const [userShop, productEntity] = await Promise.all([
            shopRepository.findByOwnerId(authenticatedUser.id),
            productRepository.findByProductId(productId),
        ]);

        if (!productEntity) {
            throw new NotFoundClientError('unknown product');
        }

        if (productEntity.shopId !== userShop?.id) {
            throw new ForbiddenClientError();
        }

        if (modifyProductParams.name !== undefined)
            productEntity.name = modifyProductParams.name;
        if (modifyProductParams.priceCurrency !== undefined)
            productEntity.priceCurrency = modifyProductParams.priceCurrency;
        if (modifyProductParams.priceCentsAmount !== undefined)
            productEntity.priceCentsAmount =
                modifyProductParams.priceCentsAmount;

        return productRepository.merge(productEntity.shopId, productEntity);
    };
};
