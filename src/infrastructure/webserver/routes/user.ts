import { IControllers } from '@adapters/controller';
import Router from 'koa-router';

export const userRouterFactory = (controllers: IControllers) => {
    const userRouter = new Router();

    userRouter.get('/:userHandle', controllers.users.getPublicProfile);

    return userRouter;
};
