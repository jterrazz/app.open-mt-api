import * as z from 'zod';

export const Z_SHOP_ID = z.number();
export const Z_SHOP_NAME = z.string().min(3).max(80);
export const Z_SHOP_HANDLE = z.string().min(3).max(40);
export const Z_SHOP_CREATION_DATE = z.date();
export const Z_SHOP_DESCRIPTION = z.string();
export const Z_SHOP_BANNER_IMAGE_URL = z.string();
export const Z_SHOP_NUMBER_OF_FOLLOWERS = z.number();

const shopEntitySchema = z.object({
    bannerImageUrl: Z_SHOP_BANNER_IMAGE_URL.nullable(),
    countFollowers: Z_SHOP_NUMBER_OF_FOLLOWERS,
    creationDate: Z_SHOP_CREATION_DATE,
    description: Z_SHOP_DESCRIPTION.nullable(),
    handle: Z_SHOP_HANDLE,
    id: Z_SHOP_ID,
    name: Z_SHOP_NAME,
});

export type ShopEntity = z.infer<typeof shopEntitySchema>;
