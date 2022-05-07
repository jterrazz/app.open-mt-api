export type ITrackerRepository = {
    requestedGetApiState: () => void;
    requestedCreatePayment: () => void;
    requestedCreateProduct: () => void;
    requestedModifyProduct: () => void;
    requestedCreateShop: () => void;
    requestedModifyShop: () => void;
    requestedDeleteShop: () => void;
    requestedGetShop: () => void;
    requestedGetUserPublicProfile: () => void;
    requestedGetUserPrivateSettings: () => void;
    requestedGetProduct: () => void;
    requestedLogIn: () => void;
    requestedLogOut: () => void;
    requestedRegisterByMail: () => void;

    start: () => void;
    stop: () => void;

    exportEvents: () => any;
};
