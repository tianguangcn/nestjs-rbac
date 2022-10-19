import { ICacheRBAC } from '../interfaces/cache.rbac.interface';
export declare class RbacCache implements ICacheRBAC {
    KEY: string;
    TTL: number;
    private readonly cache;
    constructor();
    get(): object | null;
    set(value: object): void;
    del(): void;
}
