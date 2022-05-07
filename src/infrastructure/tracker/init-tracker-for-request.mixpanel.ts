import { Applicable } from '@domain/applicable';
import { IConfiguration } from '@application/contracts';
import { InitTrackerForRequest } from '@domain/tracker/init-tracker-for-request';
import { trackerRepositoryMixpanelFactory } from '@infrastructure/repositories/tracker.repository-mixpanel';

type InitTrackerForRequestInMemory = {
    factory: (configuration: IConfiguration) => InitTrackerForRequest;
} & Applicable;

export const initTrackerForRequestMixpanelFactory: InitTrackerForRequestInMemory =
    {
        factory: (configuration) => {
            return (userId) => {
                return trackerRepositoryMixpanelFactory(configuration);
            };
        },
        isApplicable: (environment: IConfiguration['ENVIRONMENT']) =>
            ['production'].includes(environment),
    };
