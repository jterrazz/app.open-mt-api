import { IConfiguration } from '@application/contracts';
import { configurationFactory } from '@configuration/configuration';

export const createMockOfConfiguration = (): IConfiguration => {
    return configurationFactory();
};
