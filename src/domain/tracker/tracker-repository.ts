export type ITrackerRepository = {
    requestedGetApiState: () => void;
    requestedCreatePayment: () => void;
    requestedCreateProduct: () => void;
    requestedModifyProduct: () => void;
    requestedCreateShop: () => void;
    requestedModifyShop: () => void;
    requestedDeleteShop: () => void;
    requestedGetShop: () => void;
    requestedGetUser: () => void;
    requestedSignInByMail: () => void;
    requestedRegisterByMail: () => void;
    start: () => void;
    stop: () => void;
    exportEvents: () => any;
};
