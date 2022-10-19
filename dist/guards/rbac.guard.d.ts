import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RbacService } from '../services/rbac.service';
export declare class RBAcGuard implements CanActivate {
    private readonly reflector;
    private readonly rbacService;
    constructor(reflector: Reflector, rbacService: RbacService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private rbacAsync;
    private rbac;
    private rbacAny;
    private rbacAnyAsync;
}
