import {
    IRepositoryFindByEmail,
    IRepositoryFindByHandle,
    IRepositoryPersist,
} from '../repository';
import { UserEntity } from './user-entity';

export interface IUserRepository {
    findByHandle: IRepositoryFindByHandle<UserEntity>;
    findByEmail: IRepositoryFindByEmail<UserEntity>;
    persist: IRepositoryPersist<UserEntity>;
}
