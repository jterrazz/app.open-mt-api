import { Context } from 'koa';
import { ITrackerRepository } from '@domain/tracker/tracker-repository';
import { UserEntity } from '@domain/user/user-entity';

export interface IKoaContext extends Context {
    requestTracker?: ITrackerRepository;
    authenticatedUser?: UserEntity;
}

export interface IInitiatedKoaContext extends Context {
    requestTracker: ITrackerRepository;
    authenticatedUser?: UserEntity;
}

export type IKoaController = (ctx: IKoaContext) => Promise<void>;
export type IInitiatedKoaController = (
    ctx: IInitiatedKoaContext,
) => Promise<void>;

export interface IControllers {
    users: {
        getPublicProfile: IKoaController;
    };
    api: {
        getState: IKoaController;
    };
    shops: {
        createShop: IKoaController;
        getShop: IKoaController;
    };
    products: {
        modifyProduct: IKoaController;
    };
}
