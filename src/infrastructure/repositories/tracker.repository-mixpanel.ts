import { IConfiguration } from '@application/contracts';
import { IStrategy } from '@domain/strategy';
import { ITrackerRepository } from '@domain/tracker/tracker.repository';

export const trackerRepositoryMixpanelFactory = (): ITrackerRepository &
    IStrategy => {
    const repository: ITrackerRepository = {
        exportEvents: () => {},

        requestedCreatePayment: () => {},
        requestedCreateProduct: () => {},
        requestedCreateShop: () => {},
        requestedDeleteShop: () => {},
        requestedGetApiState: () => {},
        requestedGetShop: () => {},
        requestedGetUser: () => {},
        requestedModifyProduct: () => {},
        requestedModifyShop: () => {},
        requestedRegisterByMail: () => {},
        requestedSignInByMail: () => {},

        start: () => {},
        stop: () => {},
    };

    return {
        ...repository,
        isApplicable: (environment: IConfiguration['ENVIRONMENT']) =>
            environment !== 'test',
    };
};
