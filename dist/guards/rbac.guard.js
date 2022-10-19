"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RBAcGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rbac_service_1 = require("../services/rbac.service");
const params_filter_1 = require("../params-filter/params.filter");
const constans_1 = require("../constans");
const rbac_permissions_decorator_1 = require("../decorators/rbac.permissions.decorator");
let RBAcGuard = class RBAcGuard {
    constructor(reflector, rbacService) {
        this.reflector = reflector;
        this.rbacService = rbacService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new common_1.ForbiddenException('Getting user was failed.');
        }
        {
            const permAsync = this.rbacAsync(context);
            if (permAsync.length > 0) {
                const filter = new params_filter_1.ParamsFilter();
                filter.setParam(constans_1.ASYNC_RBAC_REQUEST_FILTER, Object.assign({}, request));
                return (await this.rbacService.getRole(user.role, filter)).canAsync(...permAsync);
            }
        }
        {
            const perm = this.rbac(context);
            if (perm.length > 0) {
                const filter = new params_filter_1.ParamsFilter();
                filter.setParam(constans_1.RBAC_REQUEST_FILTER, Object.assign({}, request));
                return (await this.rbacService.getRole(user.role, filter)).can(...perm);
            }
        }
        {
            const permAny = this.rbacAny(context);
            if (permAny.length > 0) {
                const filter = new params_filter_1.ParamsFilter();
                filter.setParam(constans_1.RBAC_REQUEST_FILTER, Object.assign({}, request));
                return (await this.rbacService.getRole(user.role, filter)).any(...permAny);
            }
        }
        {
            const permAnyAsync = this.rbacAnyAsync(context);
            if (permAnyAsync.length > 0) {
                const filter = new params_filter_1.ParamsFilter();
                filter.setParam(constans_1.ASYNC_RBAC_REQUEST_FILTER, Object.assign({}, request));
                return await (await this.rbacService.getRole(user.role, filter)).anyAsync(...permAnyAsync);
            }
        }
        throw new common_1.ForbiddenException();
    }
    rbacAsync(context) {
        const permissions = this.reflector.get(rbac_permissions_decorator_1.RBAcAsyncPermissions.name, context.getHandler())
            || this.reflector.get(rbac_permissions_decorator_1.RBAcAsyncPermissions.name, context.getClass());
        if (permissions !== undefined) {
            return permissions;
        }
        return [];
    }
    rbac(context) {
        const permissions = this.reflector.get(rbac_permissions_decorator_1.RBAcPermissions.name, context.getHandler())
            || this.reflector.get(rbac_permissions_decorator_1.RBAcPermissions.name, context.getClass());
        if (permissions !== undefined) {
            return permissions;
        }
        return [];
    }
    rbacAny(context) {
        const permissions = this.reflector.get(rbac_permissions_decorator_1.RBAcAnyPermissions.name, context.getHandler())
            || this.reflector.get(rbac_permissions_decorator_1.RBAcAnyPermissions.name, context.getClass());
        if (permissions !== undefined) {
            return permissions;
        }
        return [];
    }
    rbacAnyAsync(context) {
        const permissions = this.reflector.get(rbac_permissions_decorator_1.RBAcAnyAsyncPermissions.name, context.getHandler())
            || this.reflector.get(rbac_permissions_decorator_1.RBAcAnyAsyncPermissions.name, context.getClass());
        if (permissions !== undefined) {
            return permissions;
        }
        return [];
    }
};
RBAcGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        rbac_service_1.RbacService])
], RBAcGuard);
exports.RBAcGuard = RBAcGuard;
//# sourceMappingURL=rbac.guard.js.map