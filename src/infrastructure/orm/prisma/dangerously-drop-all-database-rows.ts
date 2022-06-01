import { IPrismaDatabase } from '@infrastructure/orm/prisma/prisma-database';
import { Prisma } from '@prisma/client';

/**
 * @warning Never activate this in production, as the database would be flushed
 */
export const dangerouslyDropAllDatabaseRows = async (
    database: IPrismaDatabase['client'],
) => {
    if (process.env.NODE_ENV !== 'test') {
        throw new Error(
            'this method should never be called in anything other than test environments',
        );
    }

    const dropAllRows = async () => {
        const modelNames = Prisma.dmmf.datamodel.models.map(
            (model) => model.name,
        );

        return Promise.all(
            modelNames.map((modelName) =>
                database[modelName.toLowerCase()]?.deleteMany(),
            ),
        );
    };

    await dropAllRows();
};
