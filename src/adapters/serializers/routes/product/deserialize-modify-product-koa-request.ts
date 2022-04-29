import * as z from 'zod';
import { IKoaDeserializer } from '@adapters/serializers/routes/koa-serializer';
import { UserEntity } from '@domain/user/user.entity';
import { zodErrorToUnprocessableEntityErrorWrapper } from '@application/utils/zod/zod-error-to-unprocessable-entity-error-wrapper';

export type DeserializeModifyProductKoaRequest = IKoaDeserializer<{
    authenticatedUser?: UserEntity;
    productId: number;
    productParams: {
        name: string;
    };
}>;

export const deserializeModifyProductKoaRequest: DeserializeModifyProductKoaRequest =
    (ctx) => {
        const parsedData = zodErrorToUnprocessableEntityErrorWrapper(() =>
            z
                .object({
                    name: z.string(),
                    productId: z.string().regex(/^\d+$/).transform(Number),
                })
                .parse({
                    ...ctx.request.body,
                    ...ctx.params,
                }),
        );

        return {
            authenticatedUser: ctx.authenticatedUser,
            productId: parsedData.productId,
            productParams: {
                name: parsedData.name,
            },
        };
    };
