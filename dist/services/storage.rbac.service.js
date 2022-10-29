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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageRbacService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let StorageRbacService = class StorageRbacService {
    constructor(moduleRef, rbac, cache) {
        this.moduleRef = moduleRef;
        this.rbac = rbac;
        this.cache = cache;
    }
    async getStorage() {
        return await this.rbac.getRbac();
    }
    async getPermissions() {
        return (await this.rbac.getRbac()).permissions;
    }
    async getGrants() {
        return (await this.rbac.getRbac()).grants;
    }
    async getRoles() {
        return (await this.rbac.getRbac()).roles;
    }
    async getGrant(role) {
        const grant = await this.parseGrants();
        return grant[role] || [];
    }
    async getFilters() {
        const result = {};
        const filters = (await this.getStorage()).filters;
        for (const key in filters) {
            let filter;
            try {
                filter = this.moduleRef.get(filters[key]);
            }
            catch (e) {
                filter = await this.moduleRef.create(filters[key]);
            }
            result[key] = filter;
        }
        return result;
    }
    async parseGrants() {
        if (this.cache) {
            const cache = await this.getFromCache();
            if (cache) {
                return cache;
            }
        }
        const { grants, permissions } = await this.rbac.getRbac();
        const result = {};
        Object.keys(grants).forEach((key) => {
            const grant = grants[key];
            result[key] = [
                ...new Set(grant.filter((value) => !value.startsWith('&'))),
            ]
                .filter((value) => {
                if (value.includes('@')) {
                    const spilt = value.split('@');
                    if (!permissions[spilt[0]]) {
                        return false;
                    }
                    return permissions[spilt[0]].some((inAction) => inAction === spilt[1]);
                }
                if (permissions[value]) {
                    return permissions[value];
                }
            });
        });
        const findExtendedGrants = {};
        Object.keys(grants).forEach((key) => {
            const grant = grants[key];
            findExtendedGrants[key] = [
                ...new Set(grant.filter((value) => {
                    if (value.startsWith('&')) {
                        const subGrant = value.substr(1);
                        if (grants[value.substr(1)] && subGrant !== key) {
                            return true;
                        }
                    }
                    return false;
                }).map(value => value.substr(1))),
            ];
        });
        Object.keys(findExtendedGrants).forEach((key) => {
            const grant = findExtendedGrants[key];
            grant.forEach((value) => {
                result[key] = [...new Set([...result[key], ...result[value]])];
            });
        });
        Object.keys(result).forEach((key) => {
            const grant = result[key];
            const per = [];
            grant.forEach((value) => {
                if (!value.includes('@')) {
                    per.push(...permissions[value].map((dd) => {
                        return `${value}@${dd}`;
                    }));
                }
            });
            result[key] = [...new Set([...result[key], ...per])];
        });
        if (this.cache) {
            this.setIntoCache(result);
        }
        return result;
    }
    async getFromCache() {
        return this.cache.get();
    }
    async setIntoCache(value) {
        await this.cache.set(value);
    }
};
StorageRbacService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Optional)()),
    __param(2, (0, common_1.Inject)('ICacheRBAC')),
    __metadata("design:paramtypes", [core_1.ModuleRef, Object, Object])
], StorageRbacService);
exports.StorageRbacService = StorageRbacService;
//# sourceMappingURL=storage.rbac.service.js.map