export interface ILogger {
    error: (message: unknown) => void;
    warn: (message: unknown) => void;
    info: (message: unknown) => void;
    verbose: (message: unknown) => void;
    debug: (message: unknown) => void;
}

export enum LOG_LEVELS {
    NONE = 'none',
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    VERBOSE = 'verbose',
    DEBUG = 'debug',
}
