import * as z from 'zod';
import { Currency, currencySchema } from '@domain/price/currency';
import { IKoaDeserializer } from '@adapters/serializers/routes/koa-serializer';
import { UserEntity } from '@domain/user/user.entity';
import { zodErrorToUnprocessableEntityErrorWrapper } from '@application/utils/zod/zod-error-to-unprocessable-entity-error-wrapper';

export type DeserializeCreateProductKoaRequest = IKoaDeserializer<{
    authenticatedUser?: UserEntity;
    productParams: {
        name: string;
        priceCentsAmount: number;
        priceCurrency: Currency;
    };
}>;

export const deserializeCreateProductKoaRequest: DeserializeCreateProductKoaRequest =
    (ctx) => {
        const parsedData = zodErrorToUnprocessableEntityErrorWrapper(() =>
            z
                .object({
                    name: z.string(),
                    priceCentsAmount: z.number().int(),
                    priceCurrency: currencySchema,
                })
                .parse(ctx.request.body),
        );

        return {
            authenticatedUser: ctx.authenticatedUser,
            productParams: {
                name: parsedData.name,
                priceCentsAmount: parsedData.priceCentsAmount,
                priceCurrency: parsedData.priceCurrency,
            },
        };
    };
