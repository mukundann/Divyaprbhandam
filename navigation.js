/**
 * navigation.js - Coordinate math and limits
 */
const Navigation = {
    /**
     * Parses the string input from the 'number' input box into coordinate components.
     * Handles flat single numbers (e.g. "12") for flat books like RN.
     */
    parseCoords: function(str, hasSub) {
        if (!str) return { ch: 1, sub: 1, pas: 1 };
        
        const parts = str.split('.').map(p => parseInt(p, 10) || 1);
        
        if (hasSub) {
            // Format: Chapter.Subchapter.Pasuram (e.g. 1.2.3)
            return {
                ch: parts[0] || 1,
                sub: parts[1] || 1,
                pas: parts[2] || 1
            };
        } else {
            // Check if it's a flat single number format (e.g., "12" instead of "1.12")
            if (parts.length === 1) {
                return {
                    ch: 1,      // Default fallback chapter layout assignment
                    sub: 1,     // Default fallback subchapter layout assignment
                    pas: parts[0]
                };
            }
            
            // Format: Chapter.Pasuram (e.g. 1.12 for non-subchapter collections)
            return {
                ch: parts[0] || 1,
                sub: 1,
                pas: parts[1] || 1
            };
        }
    },

    /**
     * Returns the total maximum pasuram limit for the current active section boundary.
     */
    getLimit: function(pre, ch, sub) {
        const c = CONFIG[pre];
        if (!c) return 10;
        
        // If it's a completely flat book structure like RN, check maxPas constraints
        if (!c.hasSub && c.maxPas) {
            return c.maxPas; // Returns 108 for RN
        }

        // Fallback multi-chapter bounds verification matrix rules
        try {
            if (c.hasSub) {
                return c.structure[ch][sub];
            } else {
                return c.structure[ch];
            }
        } catch (e) {
            // Safe operational fallback if lookup mapping configuration misses a line key
            return c.maxPas || 10;
        }
    }
};
