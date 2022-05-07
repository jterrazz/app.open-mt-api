import {
    IConfiguration,
    apiConfigSchema,
    clientSessionConfigSchema,
    databaseConfigSchema,
    environmentSchema,
    logConfigSchema,
    servicesConfigSchema,
} from '@application/contracts/configuration';
import config from 'config'; // .yml configuration
// eslint-disable-next-line @typescript-eslint/no-var-requires
const versionFromPackageJson = require('../../package.json').version;

export const configurationFactory = (
    nodeEnv = process.env.NODE_ENV,
): IConfiguration => {
    const configuration: IConfiguration = {
        API: apiConfigSchema.parse({
            ...(config.get('API') as object),
            VERSION: versionFromPackageJson,
        }),
        CLIENT_SESSION: clientSessionConfigSchema.parse(
            config.get('CLIENT_SESSION'),
        ),
        DATABASE: databaseConfigSchema.parse(config.get('DATABASE')),
        ENVIRONMENT: environmentSchema.parse(nodeEnv),
        LOG: logConfigSchema.parse(config.get('LOG')),
        SERVICES: servicesConfigSchema.parse(config.get('SERVICES')),
    };

    if (
        configuration.ENVIRONMENT === 'production' &&
        !configuration.SERVICES.MIXPANEL
    ) {
        throw new Error('a mixpanel configuration is required for production');
    }

    return configuration;
};
