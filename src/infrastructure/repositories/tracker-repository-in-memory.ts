import { EventIdentifiers } from '@domain/tracker/events';
import { IConfiguration, IStrategy } from '@application/contracts';
import { ITrackerRepository } from '@domain/tracker/tracker-repository';

export type EventInMemory = {
    event: string;
    date: Date;
};

export const trackerRepositoryInMemoryFactory = (): ITrackerRepository &
    IStrategy => {
    const allEvents: EventInMemory[] = [];
    const pushEvent = (name: string) =>
        allEvents.push({
            date: new Date(),
            event: name,
        });

    const repository: ITrackerRepository = {
        exportEvents: () => allEvents,

        requestedCreatePayment: () =>
            pushEvent(EventIdentifiers.REQUESTED_CREATE_PAYMENT),
        requestedCreateProduct: () =>
            pushEvent(EventIdentifiers.REQUESTED_CREATE_PRODUCT),
        requestedCreateShop: () =>
            pushEvent(EventIdentifiers.REQUESTED_CREATE_SHOP),
        requestedDeleteShop: () =>
            pushEvent(EventIdentifiers.REQUESTED_DELETE_SHOP),
        requestedGetApiState: () =>
            pushEvent(EventIdentifiers.REQUESTED_GET_API_STATE),
        requestedGetShop: () => pushEvent(EventIdentifiers.REQUESTED_GET_SHOP),
        requestedGetUser: () => pushEvent(EventIdentifiers.REQUESTED_GET_USER),
        requestedModifyProduct: () =>
            pushEvent(EventIdentifiers.REQUESTED_MODIFY_PRODUCT),
        requestedModifyShop: () =>
            pushEvent(EventIdentifiers.REQUESTED_MODIFY_SHOP),
        requestedRegisterByMail: () =>
            pushEvent(EventIdentifiers.REQUESTED_REGISTER_BY_MAIL),
        requestedSignInByMail: () =>
            pushEvent(EventIdentifiers.REQUESTED_SIGN_IN_BY_MAIL),

        start: () => pushEvent(EventIdentifiers.START),
        stop: () => pushEvent(EventIdentifiers.STOP),
    };

    return {
        ...repository,
        isApplicable: (environment: IConfiguration['ENVIRONMENT']) =>
            ['test'].includes(environment),
    };
};
