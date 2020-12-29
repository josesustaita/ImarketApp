"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeviceOrientation = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var screen = react_native_1.Dimensions.get('screen');
function useDeviceOrientation() {
    var isOrientationPortrait = function (_a) {
        var width = _a.width, height = _a.height;
        return height >= width;
    };
    var isOrientationLandscape = function (_a) {
        var width = _a.width, height = _a.height;
        return width >= height;
    };
    var _a = react_1.useState({
        portrait: isOrientationPortrait(screen),
        landscape: isOrientationLandscape(screen),
    }), orientation = _a[0], setOrientation = _a[1];
    var onChange = react_1.useCallback(function (_a) {
        var scr = _a.screen;
        setOrientation({
            portrait: isOrientationPortrait(scr),
            landscape: isOrientationLandscape(scr),
        });
    }, []);
    react_1.useEffect(function () {
        react_native_1.Dimensions.addEventListener('change', onChange);
        return function () {
            react_native_1.Dimensions.removeEventListener('change', onChange);
        };
    }, [orientation.portrait, orientation.landscape, onChange]);
    return orientation;
}
exports.useDeviceOrientation = useDeviceOrientation;
//# sourceMappingURL=useDeviceOrientation.js.map