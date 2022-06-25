import { BrokenOneToOneRelationServerError } from '@domain/error/server/broken-one-to-one-relation-server-error';
import { DuplicatedFieldServerError } from '@domain/error/server/duplicated-field-server-error';
import { NotFoundServerError } from '@domain/error/server/not-found-server-error';
import { getDependencies } from '@configuration/dependencies';
import { seedDatabaseWithShop } from '@tests/seeds/seed-database-with-shop';
import { seedDatabaseWithUser } from '@tests/seeds/seed-database-with-user';
import { shopRepositoryPrismaFactory } from '@infrastructure/repositories/shop.prisma-repository';

const databaseClient = getDependencies().database.client;
const repository = shopRepositoryPrismaFactory(databaseClient);

let globallySeededShop, globallySeededUser;

beforeAll(async () => {
    const { shop, user } = await seedDatabaseWithShop(databaseClient, {
        handle: 'shop_repository_prisma_handle',
    });

    globallySeededShop = shop;
    globallySeededUser = user;
});

describe('ShopRepositoryPrisma', function () {
    describe('add()', function () {
        const createMockOfNewShopData = (data = {}) => ({
            description: 'the_created_description',
            handle: 'the_created_handle',
            name: 'the_created_name',
            ...data,
        });

        test('adds a shop to database', async () => {
            // Given
            const seededUser = await seedDatabaseWithUser(databaseClient);
            const newShopData = createMockOfNewShopData();

            // When
            const result = await repository.add(newShopData, seededUser.id);

            // Then
            expect(result).toEqual({
                bannerImageUrl: null,
                countFollowers: 0,
                creationDate: expect.any(Date), // TODO rename to createdAt
                description: 'the_created_description',
                handle: 'the_created_handle',
                id: expect.any(Number),
                name: 'the_created_name',
            });
            expect(
                await databaseClient.shop.findFirst({
                    where: {
                        id: result.id,
                    },
                }),
            ).toEqual({
                bannerImageId: null,
                countOfFollowers: 0,
                createdAt: result.creationDate,
                description: 'the_created_description',
                handle: 'the_created_handle',
                id: expect.any(Number),
                name: 'the_created_name',
                updatedAt: expect.any(Date),
                userId: seededUser.id,
            });
        });

        test('throws if the user already has a shop', async () => {
            // Given
            const newShopData = createMockOfNewShopData({
                handle: globallySeededShop.handle,
            });

            // When
            const ft = () => repository.add(newShopData, globallySeededUser.id);

            // Then
            await expect(ft).rejects.toBeInstanceOf(
                BrokenOneToOneRelationServerError,
            );
            await expect(ft).rejects.toEqual({ relationName: 'ShopToUser' });
        });

        test("throws if the shop's handle duplicates an existing one", async () => {
            // Given
            const seededUser = await seedDatabaseWithUser(databaseClient);
            const newShopData = createMockOfNewShopData({
                handle: globallySeededShop.handle,
            });

            // When
            const ft = () => repository.add(newShopData, seededUser.id);

            // Then
            await expect(ft).rejects.toBeInstanceOf(DuplicatedFieldServerError);
            await expect(ft).rejects.toEqual({
                field: 'handle',
            });
        });
    });

    describe('update()', function () {
        const createMockOfUpdatedShopData = (data = {}) => ({
            description: 'the_updated_description',
            name: 'the_updated_name',
            ...data,
        });

        test('updates the data of a shop', async () => {
            // Given
            const { shop: seededShop, user: seededUser } =
                await seedDatabaseWithShop(databaseClient);
            const updatedShopData = createMockOfUpdatedShopData();

            // When
            const result = await repository.update(
                updatedShopData,
                seededShop.id,
            );

            // Then
            expect(result).toEqual({
                bannerImageUrl: null,
                countFollowers: 0,
                creationDate: seededShop.createdAt,
                description: 'the_updated_description',
                handle: seededShop.handle,
                id: seededShop.id,
                name: 'the_updated_name',
            });
            expect(
                await databaseClient.shop.findFirst({
                    where: {
                        id: result.id,
                    },
                }),
            ).toEqual({
                bannerImageId: null,
                countOfFollowers: 0,
                createdAt: seededShop.createdAt,
                description: 'the_updated_description',
                handle: seededShop.handle,
                id: seededShop.id,
                name: 'the_updated_name',
                updatedAt: expect.any(Date),
                userId: seededUser?.id,
            });
        });

        test("throws if the shop doesn't exist", async () => {
            // Given
            const updatedShopData = createMockOfUpdatedShopData();

            // When
            const ft = () => repository.update(updatedShopData, -1);

            // Then
            await expect(ft).rejects.toThrow(NotFoundServerError);
        });
    });

    describe('findByHandle()', function () {
        test('returns entity of an existing shop', async () => {
            // Given
            // Shop seeded in beforeAll()

            // When
            const result = await repository.findByHandle(
                'shop_repository_prisma_handle',
            );

            // Then
            expect(result).toEqual({
                bannerImageUrl: null,
                countFollowers: 0,
                creationDate: globallySeededShop.createdAt,
                description: 'the_shop_description',
                handle: 'shop_repository_prisma_handle',
                id: globallySeededShop.id,
                name: 'the_shop_name',
            });
        });

        test('returns null if no shop has this handle', async () => {
            // Given
            const unknownHandle = 'handle_that_does_not_exist';

            // When
            const result = await repository.findByHandle(unknownHandle);

            // Then
            expect(result).toEqual(null);
        });
    });

    describe('findByOwnerId()', function () {
        test('returns entity of an existing shop', async () => {
            // Given
            // Shop seeded in beforeAll()

            // When
            const result = await repository.findByOwnerId(
                globallySeededUser.id,
            );

            // Then
            expect(result).toEqual({
                bannerImageUrl: null,
                countFollowers: 0,
                creationDate: globallySeededShop.createdAt,
                description: 'the_shop_description',
                handle: 'shop_repository_prisma_handle',
                id: globallySeededShop.id,
                name: 'the_shop_name',
            });
        });

        test('returns null if no shop has this ownerId', async () => {
            // Given
            const unknownOwnerId = -1;

            // When
            const result = await repository.findByOwnerId(unknownOwnerId);

            // Then
            expect(result).toEqual(null);
        });
    });
});
