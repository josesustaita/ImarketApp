"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_hooks_1 = require("@testing-library/react-hooks");
var useLayout_1 = require("./useLayout");
describe('bla', function () {
    it('should increment counter', function () {
        var result = react_hooks_1.renderHook(function () { return useLayout_1.useLayout(); }).result;
        expect(result.current.x).toBe(0);
        expect(result.current.y).toBe(0);
        expect(result.current.width).toBe(0);
        expect(result.current.height).toBe(0);
    });
});
//# sourceMappingURL=useLayout.test.js.map