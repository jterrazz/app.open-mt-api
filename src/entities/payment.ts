enum PaymentStatus {
    validated,
    initiated,
    failed,
    unknown,
}

export type Payment = {
    senderIban: string;
    receiverIban: string;
    amount: number;
    message: string;
    status?: PaymentStatus;
    executionDate: Date;
};
