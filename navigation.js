/**
 * navigation.js - Coordinate math and limits
 */
const Navigation = {
    getLimit: function(pre, ch, sub) {
        const c = window.CONFIG[pre];
        const isSingle = typeof c.isSingleFile === 'function' ? c.isSingleFile(`${ch}.${sub}`) : c.isSingleFile;

        if (isSingle) {
            const masterKey = `${pre}.${ch}.all`;
            const masterMarkers = window.MARKER_DATABASE ? window.MARKER_DATABASE[masterKey] : null;
            if (masterMarkers) return masterMarkers.length;
        }
        const key = c.hasSub ? `${ch}.${sub}` : `${ch}`;
        return c.ex[key] || c.defPas;
    },

    parseCoords: function(inputVal, hasSub) {
        let parts = inputVal.split('.').map(Number);
        return hasSub ? { ch: parts[0], sub: parts[1], pas: parts[2] } 
                      : { ch: parts[0], sub: 0, pas: parts[1] || parts[0] };
    }
};
window.Navigation = Navigation;
