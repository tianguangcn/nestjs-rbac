import { IStorageRbac } from '../interfaces/storage.rbac.interface';
import { ModuleRef } from '@nestjs/core';
import { IDynamicStorageRbac } from '../interfaces/dynamic.storage.rbac.interface';
import { ICacheRBAC } from '../interfaces/cache.rbac.interface';
export declare class StorageRbacService {
    private readonly moduleRef;
    private readonly rbac;
    private readonly cache?;
    constructor(moduleRef: ModuleRef, rbac: IDynamicStorageRbac, cache?: ICacheRBAC);
    getStorage(): Promise<IStorageRbac>;
    getPermissions(): Promise<object>;
    getGrants(): Promise<object>;
    getRoles(): Promise<string[]>;
    getGrant(role: string): Promise<string[]>;
    getFilters(): Promise<object>;
    private parseGrants;
    private getFromCache;
    private setIntoCache;
}
