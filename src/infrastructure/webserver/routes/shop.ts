import { IControllers } from '@adapters/controller';
import Router from 'koa-router';

export const shopRouterFactory = (controllers: IControllers) => {
    const shopRouter = new Router();

    shopRouter.post('/', controllers.shops.createShop);
    shopRouter.get('/:shopHandle', controllers.shops.getShop);

    return shopRouter;
};
