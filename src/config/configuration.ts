import 'dotenv/config.js';
import {
    IConfiguration,
    apiConfigSchema,
    databaseConfigSchema,
    environmentSchema,
    logConfigSchema,
} from '@application/contracts/IConfiguration';

// .yml config
process.env['NODE_CONFIG_DIR'] = __dirname + '/';
import config from 'config';

export const configurationFactory = (): IConfiguration => {
    const ENVIRONMENT = environmentSchema.parse(process.env.NODE_ENV);
    const API = apiConfigSchema.parse(config.get('API'));
    const LOG = logConfigSchema.parse(config.get('LOG'));
    const DATABASE = databaseConfigSchema.parse(config.get('DATABASE'));

    return {
        API,
        DATABASE,
        ENVIRONMENT,
        LOG,
    };
};
