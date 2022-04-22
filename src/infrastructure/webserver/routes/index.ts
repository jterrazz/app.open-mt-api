import Router from 'koa-router';

import { IControllers } from '@adapters/controller';
import { shopRouterFactory } from '@infrastructure/webserver/routes/shop';
import { userRouterFactory } from './user';

export const routerFactory = (controllers: IControllers): Router => {
    const router = new Router();
    const shopRouter = shopRouterFactory(controllers);
    const userRouter = userRouterFactory(controllers);

    router.get('/', controllers.api.getState);
    router.use('/shop', shopRouter.routes(), shopRouter.allowedMethods());
    router.use('/user', userRouter.routes(), userRouter.allowedMethods());

    return router;
};
