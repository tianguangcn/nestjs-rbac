import { DynamicModule } from '@nestjs/common';
import { ICacheRBAC } from './interfaces/cache.rbac.interface';
import { IDynamicStorageRbac } from './interfaces/dynamic.storage.rbac.interface';
import { IStorageRbac } from './interfaces/storage.rbac.interface';
export declare class RBAcModule {
    private static moduleRef;
    private static cache?;
    private static cacheOptions?;
    static useCache(cache: any | ICacheRBAC, options?: {
        KEY?: string;
        TTL?: number;
    }): typeof RBAcModule;
    static forRoot(rbac: IStorageRbac, providers?: any[], imports?: any[]): DynamicModule;
    static forDynamic(rbac: new () => IDynamicStorageRbac, providers?: any[], imports?: any[]): DynamicModule;
    private static setCacheOptions;
}
