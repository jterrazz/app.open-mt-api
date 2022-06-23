import { PaymentEntity } from './payment.entity';

export interface IPaymentRepository {
    persist(payment: PaymentEntity): Promise<void>; // TODO Rename all to add
    merge(payment: PaymentEntity): Promise<void>; // TODO Rename all to edit
}
