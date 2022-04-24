import { z } from 'zod';

export type Currency = 'EUR' | 'USD';

export const currencySchema = z.enum(['USD', 'EUR']);
