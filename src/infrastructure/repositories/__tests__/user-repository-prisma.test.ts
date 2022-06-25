import { DuplicatedFieldServerError } from '@domain/error/server/duplicated-field-server-error';
import { LANGUAGE } from '@domain/user/language';
import { getDependencies } from '@configuration/dependencies';
import { seedDatabaseWithUser } from '@tests/seeds/seed-database-with-user';
import { userRepositoryPrismaFactory } from '@infrastructure/repositories/user.prisma-repository';

const databaseClient = getDependencies().database.client;
const repository = userRepositoryPrismaFactory(databaseClient);

describe('userRepositoryPrisma', () => {
    describe('dd()', () => {
        const createMockOfNewUserData = (args = {}) => ({
            authentication: {
                email: 'the_created_email',
                hashedPassword: 'the_created_hashed_password',
            },
            profile: {
                firstName: 'the_created_first_name',
                lastName: 'the_created_last_name',
            },
            settings: {
                language: LANGUAGE.FR,
            },
            ...args,
        });

        test('adds a user to database', async () => {
            // Given
            const newUserData = createMockOfNewUserData();

            // When
            const result = await repository.add(newUserData);

            // Then
            expect(result).toEqual({
                authentication: {
                    email: newUserData.authentication.email,
                    hashedPassword: newUserData.authentication.hashedPassword,
                },
                id: expect.any(Number),
                profile: {
                    firstName: newUserData.profile.firstName,
                    lastName: newUserData.profile.lastName,
                },
                settings: {
                    language: newUserData.settings.language,
                },
            });
            expect(
                await databaseClient.user.findFirst({
                    where: {
                        id: result.id,
                    },
                }),
            ).toEqual({
                avatarImageId: null,
                createdAt: expect.any(Date),
                email: 'the_created_email',
                firstName: 'the_created_first_name',
                hashedPassword: 'the_created_hashed_password',
                id: expect.any(Number),
                language: 'FR',
                lastName: 'the_created_last_name',
                updatedAt: expect.any(Date),
            });
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
                authentication: {
                    email,
                    hashedPassword: seededUser.hashedPassword,
                },
                id: seededUser.id,
                profile: {
                    firstName: seededUser.firstName,
                    lastName: seededUser.lastName,
                },
                settings: {
                    language: seededUser.language,
                },
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
    // describe('findById()', () => {
    //     test('finds an existing user', async () => {
    //         // Given
    //         const handle = 'existing_handle';
    //         const seededUser = await seedDatabaseWithUser(databaseClient, {
    //             handle,
    //         });
    //
    //         // When
    //         const result = await repository.findById(handle);
    //
    //         // Then
    //         expect(result).toEqual({
    //             email: seededUser.email,
    //             firstName: 'the_user_first_name',
    //             handle,
    //             hashedPassword: 'the_user_hashed_password',
    //             id: seededUser.id,
    //             lastName: 'the_user_last_name',
    //         });
    //     });
    //
    //     test('does not find a user that does not exist', async () => {
    //         // Given
    //         const handle = 'handle_that_does_not_exist';
    //
    //         // When
    //         const result = await repository.findById(handle);
    //
    //         // Then
    //         expect(result).toBeNull();
    //     });
    // });
});
