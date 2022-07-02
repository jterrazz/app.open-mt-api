import { PaymentStatus } from '@domain/payment/payment-status';

export type PaymentEntity = {
    senderIban: string;
    receiverIban: string;
    amount: number;
    message: string;
    status?: PaymentStatus;
    executionDate: Date;
};
