import { IKoaContext } from '@adapters/controllers/koa-controller';

export type IKoaSerializer<Params> = (ctx: IKoaContext, args: Params) => void;
export type IKoaDeserializer<Result> = (ctx: IKoaContext) => Result;
