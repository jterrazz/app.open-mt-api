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
    logout: () => Promise<void>;
}

export type IKoaController = (ctx: IKoaContext) => Promise<void>;
export type IInitiatedKoaController = (
    ctx: IInitiatedKoaContext,
) => Promise<void>;

export interface IControllers {
    api: {
        getState: IKoaController;
    };
    authentication: {
        logIn: IKoaController;
        logOut: IKoaController;
    };
    shops: {
        createShop: IKoaController;
        getShop: IKoaController;
    };
    users: {
        getPublicProfile: IKoaController;
    };
    products: {
        createProduct: IKoaController;
        modifyProduct: IKoaController;
    };
}
