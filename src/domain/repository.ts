export type IRepositoryPersist<EntityType> = (
    entity: EntityType,
) => Promise<EntityType>;
export type IRepositoryFindByID<EntityType, Params = void> = (
    id: number,
    params: Params,
) => Promise<EntityType | null>;
export type IRepositoryFindByHandle<EntityType> = (
    handle: string,
) => Promise<EntityType | null>;
export type IRepositoryFindByEmail<EntityType> = (
    handle: string,
) => Promise<EntityType | null>;
export type IRepositoryMerge<EntityType> = (
    entity: EntityType,
) => Promise<EntityType>;
