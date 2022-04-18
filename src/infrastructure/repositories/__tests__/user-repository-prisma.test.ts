import { initDependencies } from '@configuration/dependencies';
import { seedDatabaseWithUser } from '@tests/seeds/user';
import { userRepositoryPrismaFactory } from '@infrastructure/repositories/user-repository-prisma';

const databaseClient = initDependencies().database.client;
const repository = userRepositoryPrismaFactory(databaseClient);

describe('userRepositoryPrisma', () => {
    describe('findByEmail()', () => {
        test('finds an existing user', async () => {
            // Given
            const email = 'existing_user@mail.com';
            const seededUser = await seedDatabaseWithUser(databaseClient, {
                email,
            });

            // When
            const result = await repository.findByEmail(email);

            // Then
            expect(result).toEqual({
                email: 'existing_user@mail.com',
                firstName: 'the_user_first_name',
                handle: seededUser.handle,
                hashedPassword: 'the_user_hashed_password',
                id: seededUser.id,
                lastName: 'the_user_last_name',
            });
        });

        test('does not find a user that does not exist', async () => {
            // Given
            const email = 'email_that_does_not_exist';

            // When
            const result = await repository.findByEmail(email);

            // Then
            expect(result).toBeNull();
        });
    });

    describe('findByHandle()', () => {
        test('finds an existing user', async () => {
            // Given
            const handle = 'existing_handle';
            const seededUser = await seedDatabaseWithUser(databaseClient, {
                handle,
            });

            // When
            const result = await repository.findByHandle(handle);

            // Then
            expect(result).toEqual({
                email: seededUser.email,
                firstName: 'the_user_first_name',
                handle,
                hashedPassword: 'the_user_hashed_password',
                id: seededUser.id,
                lastName: 'the_user_last_name',
            });
        });

        test('does not find a user that does not exist', async () => {
            // Given
            const handle = 'handle_that_does_not_exist';

            // When
            const result = await repository.findByHandle(handle);

            // Then
            expect(result).toBeNull();
        });
    });
});
