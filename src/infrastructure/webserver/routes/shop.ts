import { IControllers } from '@adapters/controllers';
import Router from 'koa-router';

export const shopRouterFactory = (controllers: IControllers) => {
    const shopRouter = new Router();

    shopRouter.post('/', controllers.shops.createShop);
    shopRouter.get('/:shopHandle', controllers.shops.getShop);

    return shopRouter;
};
