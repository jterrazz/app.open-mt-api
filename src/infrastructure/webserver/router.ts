import { IAdapterControllers } from '@adapters/types';
import Router from 'koa-router';
import passport from 'koa-passport';

export const routerFactory = (controllers: IAdapterControllers): Router => {
    const router = new Router();

    // API
    router.get('/', controllers.api.getState);

    // Authentication
    router.post(
        '/authentication/login',
        passport.authenticate('local'),
        controllers.authentication.logIn,
    );
    router.post('/authentication/logout', controllers.authentication.logOut);

    // Me
    router.get('/me/followed-shops', controllers.me.getUserListOfFollowedShops);

    // Shop
    router.post('/shops', controllers.shops.createShop);
    router.get('/shops/:shopHandle', controllers.shops.getShop);

    // Product
    router.post('/products', controllers.products.createProduct);
    router.get('/products/:productId', controllers.products.getProduct);
    router.patch('/products/:productId', controllers.products.modifyProduct);

    // User
    router.get('/users/:userId', controllers.users.getPublicProfile);

    return router;
};
