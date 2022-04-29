import { ITrackerRepository } from '@domain/tracker/tracker.repository';

export const createMockOfTrackerRepository = (): ITrackerRepository => {
    return {
        exportEvents: jest.fn(),

        requestedCreatePayment: jest.fn(),
        requestedCreateProduct: jest.fn(),
        requestedCreateShop: jest.fn(),
        requestedDeleteShop: jest.fn(),
        requestedGetApiState: jest.fn(),
        requestedGetShop: jest.fn(),
        requestedGetUser: jest.fn(),
        requestedModifyProduct: jest.fn(),
        requestedModifyShop: jest.fn(),
        requestedRegisterByMail: jest.fn(),
        requestedSignInByMail: jest.fn(),

        start: jest.fn(),
        stop: jest.fn(),
    };
};
