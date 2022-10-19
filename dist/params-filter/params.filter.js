"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsFilter = void 0;
class ParamsFilter {
    constructor() {
        this.storage = {};
    }
    getParam(filter) {
        return this.storage[filter];
    }
    setParam(filter, ...params) {
        this.storage[filter] = params;
        return this;
    }
}
exports.ParamsFilter = ParamsFilter;
//# sourceMappingURL=params.filter.js.map