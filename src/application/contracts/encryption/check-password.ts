export type CheckPassword = (
    password: string,
    hashedPassword: string,
) => Promise<boolean>;
