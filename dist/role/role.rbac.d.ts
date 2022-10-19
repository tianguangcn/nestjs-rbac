import { IRoleRbac } from './interfaces/role.rbac.interface';
import { IParamsFilter } from '../params-filter/interfaces/params.filter.interface';
export declare class RoleRbac implements IRoleRbac {
    private readonly role;
    private readonly grant;
    private readonly filters;
    private readonly paramsFilter?;
    constructor(role: string, grant: string[], filters: object, paramsFilter?: IParamsFilter);
    canAsync(...permissions: string[]): Promise<boolean>;
    can(...permissions: string[]): boolean;
    any(...permissions: string[][]): boolean;
    anyAsync(...permissions: string[][]): Promise<boolean>;
    private checkPermissions;
}
