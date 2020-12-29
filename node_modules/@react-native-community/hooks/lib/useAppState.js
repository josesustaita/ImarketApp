"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppState = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
function useAppState() {
    var currentState = react_native_1.AppState.currentState;
    var _a = react_1.useState(currentState), appState = _a[0], setAppState = _a[1];
    function onChange(newState) {
        setAppState(newState);
    }
    react_1.useEffect(function () {
        react_native_1.AppState.addEventListener('change', onChange);
        return function () {
            react_native_1.AppState.removeEventListener('change', onChange);
        };
    }, []);
    return appState;
}
exports.useAppState = useAppState;
//# sourceMappingURL=useAppState.js.map