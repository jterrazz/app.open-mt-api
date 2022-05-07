import { ITrackerRepository } from '@domain/tracker/tracker.repository';

export const createMockOfTrackerRepository =
    (): jest.Mocked<ITrackerRepository> => {
        return {
            exportEvents: jest.fn(),

            requestedCreatePayment: jest.fn(),
            requestedCreateProduct: jest.fn(),
            requestedCreateShop: jest.fn(),
            requestedDeleteShop: jest.fn(),
            requestedGetApiState: jest.fn(),
            requestedGetProduct: jest.fn(),
            requestedGetShop: jest.fn(),
            requestedGetUserPrivateSettings: jest.fn(),
            requestedGetUserPublicProfile: jest.fn(),
            requestedLogIn: jest.fn(),
            requestedLogOut: jest.fn(),
            requestedModifyProduct: jest.fn(),
            requestedModifyShop: jest.fn(),
            requestedRegisterByMail: jest.fn(),

            start: jest.fn(),
            stop: jest.fn(),
        };
    };
