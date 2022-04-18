import { IProductRepository } from '../product-repository';
import { createMockOfProductEntity } from '@domain/product/__tests__/product-entity.mock';

export const createMockOfProductRepository = (
    partialProductRepository: Partial<IProductRepository> = {},
): IProductRepository => {
    return {
        findByProductId: jest
            .fn()
            .mockResolvedValue(createMockOfProductEntity()),
        merge: jest.fn().mockImplementation(async (_, input) => input),
        persist: jest.fn().mockImplementation(async (input) => input),
        ...partialProductRepository,
    };
};
