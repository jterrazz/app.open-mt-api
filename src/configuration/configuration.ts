import {
    IConfiguration,
    apiConfigSchema,
    databaseConfigSchema,
    environmentSchema,
    logConfigSchema,
} from '@application/contracts/configuration';
import config from 'config'; // .yml configuration
// eslint-disable-next-line @typescript-eslint/no-var-requires
const versionFromPackageJson = require('../../package.json').version;

export const configurationFactory = (
    nodeEnv = process.env.NODE_ENV,
): IConfiguration => {
    const ENVIRONMENT = environmentSchema.parse(nodeEnv);
    const API = apiConfigSchema.parse({
        ...(config.get('API') as object),
        VERSION: versionFromPackageJson,
    });
    const LOG = logConfigSchema.parse(config.get('LOG'));
    const DATABASE = databaseConfigSchema.parse(config.get('DATABASE'));

    return {
        API,
        DATABASE,
        ENVIRONMENT,
        LOG,
    };
};
