import { IKoaContext } from '@adapters/controller';

export type IKoaSerializer<Params> = (ctx: IKoaContext, args: Params) => void;
export type IKoaDeserializer<Result> = (ctx: IKoaContext) => Result;
