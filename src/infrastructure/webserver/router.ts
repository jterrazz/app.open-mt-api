import { IAdapterControllers } from '@adapters/types';
import Router from 'koa-router';
import passport from 'koa-passport';

export const routerFactory = (controllers: IAdapterControllers): Router => {
    const router = new Router();

    // API
    router.get('/', controllers.api.getState);

    // Authentication
    router.post(
        '/auth/login',
        passport.authenticate('local'),
        controllers.authentication.logIn,
    );
    router.post('/auth/logout', controllers.authentication.logOut);

    // Shop
    router.post('/shop', controllers.shops.createShop);
    router.get('/shop/:shopHandle', controllers.shops.getShop);

    // Product
    router.post('/product', controllers.products.createProduct);

    // User
    router.get('/user/:userId', controllers.users.getPublicProfile);

    return router;
};
