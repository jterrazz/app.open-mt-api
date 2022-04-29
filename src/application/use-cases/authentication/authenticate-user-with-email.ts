import { AuthenticationRequiredClientError } from '@domain/error/client/authentication-required-client-error';
import { CheckPassword } from '../../../domain/encryption/check-password';
import { ILogger } from '@application/contracts';
import { IUserRepository } from '@domain/user/user.repository';
import { UserEntity } from '@domain/user/user.entity';

export type AuthenticateUserWithEmail = (
    email: string,
    password: string,
) => Promise<UserEntity>;

export const authenticateUserWithEmailFactory = (
    logger: ILogger,
    userRepository: IUserRepository,
    checkPassword: CheckPassword,
): AuthenticateUserWithEmail => {
    return async (email, password) => {
        logger.debug(`authenticating user ${email}`);

        const userEntity = await userRepository.findByEmail(email);

        if (!userEntity) {
            logger.debug(
                `failed to authenticate user ${email} because its email does not exist`,
            );
            throw new AuthenticationRequiredClientError();
        }

        const passwordIsValid = await checkPassword(
            password,
            userEntity.hashedPassword,
        );

        if (!passwordIsValid) {
            logger.debug(
                `failed to authenticate user ${email} because its password is wrong`,
            );
            throw new AuthenticationRequiredClientError();
        }

        logger.debug(`successfully authenticated user ${email}`);

        return userEntity;
    };
};
