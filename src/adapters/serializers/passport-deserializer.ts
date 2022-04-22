import { UserEntity } from '@domain/user/user-entity';
import { createMockOfUser } from '@domain/user/__tests__/user-entity.mock';

export const passportDeserializer = (
    userId: number,
    done: (err: Error | null, user?: UserEntity) => void,
) => {
    try {
        // const user = await userRepository.findById(userId); // TODO
        const user = createMockOfUser();
        done(null, user);
    } catch (err) {
        done(err);
    }
};
