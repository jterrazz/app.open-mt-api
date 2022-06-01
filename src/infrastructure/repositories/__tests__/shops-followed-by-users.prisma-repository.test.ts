import { getDependencies } from '@configuration/dependencies';
import { seedDatabaseWithShop } from '@tests/seeds/shop';
import { seedDatabaseWithShopsFollowedByUsers } from '@tests/seeds/shops-followed-by-users';
import { shopsFollowedByUsersPrismaRepositoryFactory } from '@infrastructure/repositories/shops-followed-by-users.prisma-repository';

const databaseClient = getDependencies().database.client;
const repository = shopsFollowedByUsersPrismaRepositoryFactory(databaseClient);

describe('shopsFollowedByUsersPrismaRepositoryFactory()', () => {
    test('returns a list of all followed shops', async () => {
        // Given
        const { shop } = await seedDatabaseWithShop(databaseClient);
        const { user } = await seedDatabaseWithShopsFollowedByUsers(
            databaseClient,
            [shop.id],
        );

        // When
        const result = await repository.findByUserId(user.id);

        // Then
        expect(result).toEqual([
            {
                bannerImageUrl: null,
                countFollowers: shop.countOfFollowers, // TODO Rename
                creationDate: shop.createdAt, // TODO Rename
                description: shop.description,
                handle: shop.handle,
                id: shop.id,
                name: shop.name,
            },
        ]);
    });
});
