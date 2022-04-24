import { IInitiatedKoaController } from '@adapters/controller';

export const authenticationControllerFactory = () => {
    const logInController: IInitiatedKoaController = async (ctx) => {
        // ctx.requestTracker.requestedLogInByMail();
        ctx.status = 200;
    };

    const logOutController: IInitiatedKoaController = async (ctx) => {
        // ctx.requestTracker.requestedLogOutByMail();
        await ctx.logout();
        ctx.session = null;
        ctx.status = 200;
    };

    return { logIn: logInController, logOut: logOutController };
};
