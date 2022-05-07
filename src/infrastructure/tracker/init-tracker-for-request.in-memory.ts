import { Applicable } from '@domain/applicable';
import { IConfiguration } from '@application/contracts';
import { InitTrackerForRequest } from '@domain/tracker/init-tracker-for-request';
import { trackerRepositoryInMemoryFactory } from '@infrastructure/repositories/tracker.repository-in-memory';

type InitTrackerForRequestInMemory = {
    factory: (configuration: IConfiguration) => InitTrackerForRequest;
} & Applicable;

export const initTrackerForRequestInMemoryFactory: InitTrackerForRequestInMemory =
    {
        factory: (configuration: IConfiguration) => {
            return (userId) => {
                return trackerRepositoryInMemoryFactory();
            };
        },
        isApplicable: (environment: IConfiguration['ENVIRONMENT']) =>
            !['production'].includes(environment),
    };
