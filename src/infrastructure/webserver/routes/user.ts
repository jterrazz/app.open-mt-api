import { IControllers } from '@adapters/controllers';
import Router from 'koa-router';

export const userRouterFactory = (controllers: IControllers) => {
    const userRouter = new Router();

    userRouter.get('/:userHandle', controllers.users.getPublicProfile);

    return userRouter;
};
