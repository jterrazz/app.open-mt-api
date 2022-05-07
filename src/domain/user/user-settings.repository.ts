import { UserSettingsEntity } from '@domain/user/user-settings.entity';

export interface UserSettingsRepository {
    findByUserId: (userId: number) => Promise<UserSettingsEntity | null>;
}
