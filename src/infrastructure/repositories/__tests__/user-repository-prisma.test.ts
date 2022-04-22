import { DuplicatedFieldError } from '@domain/error/technical/duplicated-field-error';
import { initDependencies } from '@configuration/dependencies';
import { seedDatabaseWithUser } from '@tests/seeds/user';
import { userRepositoryPrismaFactory } from '@infrastructure/repositories/user-repository-prisma';

const databaseClient = initDependencies().database.client;
const repository = userRepositoryPrismaFactory(databaseClient);

describe('userRepositoryPrisma', () => {
    describe('persist()', () => {
        const createMockOfNewUserData = (args = {}) => ({
            email: 'the_created_email',
            firstName: 'the_created_first_name',
            hashedPassword: 'the_created_hashed_password',
            lastName: 'the_created_last_name',
            ...args,
        });

        test('persists a user to database', async () => {
            // Given
            const newUserData = createMockOfNewUserData();

            // When
            const result = await repository.persist(newUserData);

            // Then
            expect(result).toEqual({
                email: 'the_created_email',
                firstName: 'the_created_first_name',
                handle: 'todelllll',
                hashedPassword: 'the_created_hashed_password',
                id: expect.any(Number),
                lastName: 'the_created_last_name',
            });
            expect(
                await databaseClient.user.findFirst({
                    include: {
                        userSettings: true,
                    },
                    where: {
                        id: result.id,
                    },
                }),
            ).toEqual({
                avatarImageId: null,
                email: 'the_created_email',
                firstName: 'the_created_first_name',
                handle: 'todelllll',
                hashedPassword: 'the_created_hashed_password',
                id: expect.any(Number),
                lastName: 'the_created_last_name',
                userSettings: {
                    id: expect.any(Number),
                    language: 'FR',
                },
                userSettingsId: expect.any(Number),
            });
        });

        test('fails when the handle is duplicated', async () => {
            // Given
            await seedDatabaseWithUser(databaseClient, {
                email: 'the_created_email_2',
            });
            const newUserData = createMockOfNewUserData({
                email: 'the_created_email_2',
            });

            // When
            const ft = () => repository.persist(newUserData);

            // Then
            // await expect(ft).rejects.toThrow(DuplicatedFieldError); Not working
            let error;
            await ft().catch((err) => (error = err));
            expect(error).toBeInstanceOf(DuplicatedFieldError);
        });
    });

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

    // TODO Delete since handle are not here
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
