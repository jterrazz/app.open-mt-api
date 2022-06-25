import { IKoaController } from '@adapters/controllers/koa-controller';
import { Middleware } from 'koa';

export interface IAdapterMiddlewares {
    handleAuthenticatedUserMiddleware: Middleware;
    handleRequestErrorsMiddleware: Middleware;
    handleRequestTrackerMiddleware: Middleware;
    setResponseHeadersMiddleware: Middleware;
}

export interface IAdapterControllers {
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
        getProduct: IKoaController;
        createProduct: IKoaController;
        modifyProduct: IKoaController;
    };
    me: {
        getUserListOfFollowedShops: IKoaController;
        getPrivateSettings: IKoaController; // TODO Remove private notion
    };
}
