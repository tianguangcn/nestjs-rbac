"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RbacExceptions = void 0;
class RbacExceptions extends Error {
    constructor(message) {
        super(`RBAC: ${message}`);
    }
}
exports.RbacExceptions = RbacExceptions;
//# sourceMappingURL=rbac.exceptions.js.map