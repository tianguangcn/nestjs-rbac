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
exports.RoleRbac = void 0;
const common_1 = require("@nestjs/common");
let RoleRbac = class RoleRbac {
    constructor(role, grant, filters, paramsFilter) {
        this.role = role;
        this.grant = grant;
        this.filters = filters;
        this.paramsFilter = paramsFilter;
    }
    canAsync(...permissions) {
        return this.checkPermissions(permissions, 'canAsync');
    }
    can(...permissions) {
        return this.checkPermissions(permissions, 'can');
    }
    any(...permissions) {
        return (permissions
            .map(permission => {
            return this.can(...permission);
        })
            .some(result => result));
    }
    async anyAsync(...permissions) {
        return (await Promise.all(permissions.map(permission => {
            return this.canAsync(...permission);
        }))).some(result => result);
    }
    checkPermissions(permissions, methodName) {
        var _a, _b, _c, _d, _e;
        if (!permissions.length) {
            return false;
        }
        for (const permission of permissions) {
            if (!this.grant.includes(permission)) {
                return false;
            }
        }
        for (const permission of permissions) {
            if (this.grant.includes(permission) && permission.includes('@')) {
                const filter = permission.split('@')[1];
                const filterService = this.filters[filter];
                if (filterService) {
                    return ((_b = (_a = filterService === null || filterService === void 0 ? void 0 : filterService[methodName]) === null || _a === void 0 ? void 0 : _a.call(filterService, this.paramsFilter ? this.paramsFilter.getParam(filter) : null)) !== null && _b !== void 0 ? _b : true);
                }
            }
            if (this.grant.includes(permission) && !permission.includes('@')) {
                for (const filter in this.filters) {
                    if (this.filters.hasOwnProperty(filter) &&
                        this.grant.includes(`${permission}@${filter}`)) {
                        return ((_e = (_d = (_c = this.filters[filter]) === null || _c === void 0 ? void 0 : _c[methodName]) === null || _d === void 0 ? void 0 : _d.call(_c, this.paramsFilter ? this.paramsFilter.getParam(filter) : null)) !== null && _e !== void 0 ? _e : true);
                    }
                }
            }
        }
        return true;
    }
};
RoleRbac = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String, Array, Object, Object])
], RoleRbac);
exports.RoleRbac = RoleRbac;
//# sourceMappingURL=role.rbac.js.map