import {
    IConfiguration,
    apiConfigSchema,
    environmentSchema,
    servicesConfigSchema,
} from '@application/contracts/configuration';
import config from 'config'; // .yml configuration
// eslint-disable-next-line @typescript-eslint/no-var-requires
const versionFromPackageJson = require('../../package.json').version;

export const configurationFactory = (
    nodeEnv = process.env.NODE_ENV,
): IConfiguration => {
    return {
        API: apiConfigSchema.parse({
            ...(config.get('API') as object),
            VERSION: versionFromPackageJson,
        }),
        ENVIRONMENT: environmentSchema.parse(nodeEnv),
        SERVICES: servicesConfigSchema.parse(config.get('SERVICES')),
    };
};
