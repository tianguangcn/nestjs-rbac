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
exports.RbacService = void 0;
const common_1 = require("@nestjs/common");
const storage_rbac_service_1 = require("./storage.rbac.service");
const role_rbac_1 = require("../role/role.rbac");
const rbac_exceptions_1 = require("../exceptions/rbac.exceptions");
let RbacService = class RbacService {
    constructor(storageRbacService) {
        this.storageRbacService = storageRbacService;
    }
    async getRole(role, paramsFilter) {
        const storage = await this.storageRbacService.getStorage();
        if (!storage.roles || !storage.roles.includes(role)) {
            throw new rbac_exceptions_1.RbacExceptions('There is no exist a role.');
        }
        return new role_rbac_1.RoleRbac(role, await this.storageRbacService.getGrant(role), await this.storageRbacService.getFilters(), paramsFilter);
    }
};
RbacService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [storage_rbac_service_1.StorageRbacService])
], RbacService);
exports.RbacService = RbacService;
//# sourceMappingURL=rbac.service.js.map