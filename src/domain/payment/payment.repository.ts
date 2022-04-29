import { PaymentEntity } from './payment.entity';

export interface IPaymentRepository {
    persist(payment: PaymentEntity): Promise<void>;
    merge(payment: PaymentEntity): Promise<void>;
}
