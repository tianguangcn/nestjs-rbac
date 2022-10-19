import { IRbac } from './interfaces/rbac.interface';
import { StorageRbacService } from './storage.rbac.service';
import { IRoleRbac } from '../role/interfaces/role.rbac.interface';
import { IParamsFilter } from '../params-filter/interfaces/params.filter.interface';
export declare class RbacService implements IRbac {
    private readonly storageRbacService;
    constructor(storageRbacService: StorageRbacService);
    getRole(role: string, paramsFilter?: IParamsFilter): Promise<IRoleRbac>;
}
