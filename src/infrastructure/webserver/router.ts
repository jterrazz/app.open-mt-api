import { IControllers } from '@adapters/controller';
import Router from 'koa-router';
import passport from 'koa-passport';

export const routerFactory = (controllers: IControllers): Router => {
    const router = new Router();

    // API
    router.get('/', controllers.api.getState);

    // Authentication
    router.post('/auth/login', passport.authenticate('local'), (ctx) => {
        ctx.status = 200;
    });
    router.post('/auth/logout', (ctx) => {
        ctx.logout();
    });

    // Shop
    router.post('/shop/', controllers.shops.createShop);
    router.get('/shop/:shopHandle', controllers.shops.getShop);

    // User
    router.get('/user/:userHandle', controllers.users.getPublicProfile);

    return router;
};
