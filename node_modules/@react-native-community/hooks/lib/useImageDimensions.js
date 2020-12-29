"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useImageDimensions = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
/**
 * @param source either a remote URL or a local file resource.
 * @returns original image dimensions (width, height and aspect ratio).
 */
function useImageDimensions(source) {
    var _a = react_1.useState({ loading: true }), result = _a[0], setResult = _a[1];
    react_1.useEffect(function () {
        try {
            if (typeof source === 'number') {
                var _a = react_native_1.Image.resolveAssetSource(source), width = _a.width, height = _a.height;
                setResult({
                    dimensions: { width: width, height: height, aspectRatio: width / height },
                    loading: false,
                });
                return;
            }
            if (typeof source === 'object' && source.uri) {
                setResult({ loading: true });
                react_native_1.Image.getSize(source.uri, function (width, height) {
                    return setResult({
                        dimensions: { width: width, height: height, aspectRatio: width / height },
                        loading: false,
                    });
                }, function (error) { return setResult({ error: error, loading: false }); });
                return;
            }
            throw new Error('not implemented');
        }
        catch (error) {
            setResult({ error: error, loading: false });
        }
    }, [source]);
    return result;
}
exports.useImageDimensions = useImageDimensions;
//# sourceMappingURL=useImageDimensions.js.map