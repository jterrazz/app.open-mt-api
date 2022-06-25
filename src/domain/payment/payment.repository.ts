import { PaymentEntity } from './payment.entity';

export interface IPaymentRepository {
    add(payment: PaymentEntity): Promise<void>;
    update(payment: PaymentEntity): Promise<void>;
}
