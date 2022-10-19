"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RBAcModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RBAcModule = void 0;
const common_1 = require("@nestjs/common");
const rbac_service_1 = require("./services/rbac.service");
const core_1 = require("@nestjs/core");
const storage_rbac_service_1 = require("./services/storage.rbac.service");
let RBAcModule = RBAcModule_1 = class RBAcModule {
    static useCache(cache, options) {
        RBAcModule_1.cache = cache;
        RBAcModule_1.cacheOptions = options;
        return RBAcModule_1;
    }
    static forRoot(rbac, providers, imports) {
        return RBAcModule_1.forDynamic(class {
            async getRbac() {
                return rbac;
            }
            ;
        }, providers, imports);
    }
    static forDynamic(rbac, providers, imports) {
        const inject = [core_1.ModuleRef, rbac];
        const commonProviders = [];
        if (RBAcModule_1.cache) {
            commonProviders.push(RBAcModule_1.cache, {
                provide: 'ICacheRBAC',
                useFactory: (cache) => {
                    return RBAcModule_1.setCacheOptions(cache);
                },
                inject: [RBAcModule_1.cache],
            });
            inject.push(RBAcModule_1.cache);
        }
        commonProviders.push(...[
            ...(providers || []),
            rbac,
            {
                provide: storage_rbac_service_1.StorageRbacService,
                useFactory: async (moduleRef, rbacService, cache) => {
                    return new storage_rbac_service_1.StorageRbacService(moduleRef, rbacService, RBAcModule_1.setCacheOptions(cache));
                },
                inject,
            },
        ]);
        return {
            module: RBAcModule_1,
            providers: commonProviders,
            imports: [
                ...(imports || []),
            ],
        };
    }
    static setCacheOptions(cache) {
        if (!cache || RBAcModule_1.cacheOptions) {
            return cache;
        }
        if (!RBAcModule_1.cacheOptions) {
            return cache;
        }
        if (RBAcModule_1.cacheOptions.KEY) {
            cache.KEY = RBAcModule_1.cacheOptions.KEY;
        }
        if (RBAcModule_1.cacheOptions.TTL) {
            cache.TTL = RBAcModule_1.cacheOptions.TTL;
        }
        return cache;
    }
};
RBAcModule = RBAcModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            rbac_service_1.RbacService,
            storage_rbac_service_1.StorageRbacService,
            core_1.Reflector,
        ],
        imports: [],
        exports: [
            rbac_service_1.RbacService,
        ],
    })
], RBAcModule);
exports.RBAcModule = RBAcModule;
//# sourceMappingURL=rbac.module.js.map