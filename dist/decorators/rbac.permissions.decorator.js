"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RBAcAnyAsyncPermissions = exports.RBAcAsyncPermissions = exports.RBAcAnyPermissions = exports.RBAcPermissions = void 0;
const common_1 = require("@nestjs/common");
const RBAcPermissions = (...permissions) => (0, common_1.SetMetadata)('RBAcPermissions', permissions);
exports.RBAcPermissions = RBAcPermissions;
const RBAcAnyPermissions = (...permissions) => (0, common_1.SetMetadata)('RBAcAnyPermissions', permissions);
exports.RBAcAnyPermissions = RBAcAnyPermissions;
const RBAcAsyncPermissions = (...permissions) => (0, common_1.SetMetadata)('RBAcAsyncPermissions', permissions);
exports.RBAcAsyncPermissions = RBAcAsyncPermissions;
const RBAcAnyAsyncPermissions = (...permissions) => (0, common_1.SetMetadata)('RBAcAnyAsyncPermissions', permissions);
exports.RBAcAnyAsyncPermissions = RBAcAnyAsyncPermissions;
//# sourceMappingURL=rbac.permissions.decorator.js.map