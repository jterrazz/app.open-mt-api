import { EventIdentifiers } from '@domain/tracker/events';
import { IConfiguration } from '@application/contracts';
import { ITrackerRepository } from '@domain/tracker/tracker.repository';
import Mixpanel from 'mixpanel';

export const trackerRepositoryMixpanelFactory = (
    configuration: IConfiguration,
): ITrackerRepository => {
    const secret = configuration.SERVICES.MIXPANEL?.SECRET;

    if (!secret) {
        throw new Error(
            'mixpanel tracker repository requires a secret in configuration',
        );
    }

    const mixpanel = Mixpanel.init(secret, {
        protocol: 'https',
    });

    return {
        exportEvents: () => {},

        requestedCreatePayment: () => {
            mixpanel.track(EventIdentifiers.REQUESTED_CREATE_PAYMENT);
        },
        requestedCreateProduct: () => {},
        requestedCreateShop: () => {},
        requestedDeleteShop: () => {},
        requestedGetApiState: () => {},
        requestedGetProduct: () => {},
        requestedGetShop: () => {},
        requestedGetUserPrivateSettings: () => {},
        requestedGetUserPublicProfile: () => {},
        requestedLogIn: () => {},
        requestedLogOut: () => {},
        requestedModifyProduct: () => {},
        requestedModifyShop: () => {},
        requestedRegisterByMail: () => {},

        start: () => {
            // mixpanel.people.set('billybob', {
            //     plan: 'premium',
            //     games_played: 1
            // }, {
            //     $ignore_time: true
            // });
        },
        stop: () => {},
    };
};
