import { z } from 'zod';

export type CurrencyEntity = 'EUR' | 'USD';

export const currencyEntitySchema = z.enum(['USD', 'EUR']);
