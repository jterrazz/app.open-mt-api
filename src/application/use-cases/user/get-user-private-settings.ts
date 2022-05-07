import { UserEntity } from '@domain/user/user.entity';
import { UserSettingsEntity } from '@domain/user/user-settings.entity';
import { UserSettingsRepository } from '@domain/user/user-settings.repository';

export type GetUserPrivateSettings = (
    authenticatedUser: UserEntity,
) => Promise<UserSettingsEntity | null>;

export const getUserPrivateSettingsFactory = (
    userSettingsRepository: UserSettingsRepository,
): GetUserPrivateSettings => {
    return (authenticatedUser) => {
        return userSettingsRepository.findByUserId(authenticatedUser.id);
    };
};
