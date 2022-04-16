import { IProductRepository } from '../product-repository';

export const createMockOfProductRepository = (
    partialProductRepository: Partial<IProductRepository> = {},
): IProductRepository => {
    return {
        findById: jest.fn().mockImplementation(async (input) => input),
        merge: jest.fn().mockImplementation(async (input) => input),
        persist: jest.fn().mockImplementation(async (input) => input),
        ...partialProductRepository,
    };
};
