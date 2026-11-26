window.registerPasuramLanguagePack({
    code: 'ka',
    label: 'Kannada (ka)',
    normalize(text) {
        if (!text) return '';
        return text
            .normalize('NFC')
            .replace(/\u0CCA\u0CC6/g, '\u0CCB')
            .replace(/\u0CC6\u0CC6/g, '\u0CC7')
            .replace(/([\u0C85-\u0CB9\u0CB1\u0CB3])([\u0CBE-\u0CCC])\u0CCD/g, '$1\u0CCD$2');
    },
    keyboard: {
        title: 'Kannada Virtual Keyboard (click to insert text)',
        vowels: ['ಅ', 'ಆ', 'ಇ', 'ಈ', 'ಉ', 'ಊ', 'ಋ', 'ೠ', 'ಎ', 'ಏ', 'ಐ', 'ಒ', 'ಓ', 'ಔ', 'ಅಂ', 'ಅಃ'],
        consonants: [
            'ಕ', 'ಖ', 'ಗ', 'ಘ', 'ಙ',
            'ಚ', 'ಛ', 'ಜ', 'ಝ', 'ಞ',
            'ಟ', 'ಠ', 'ಡ', 'ಢ', 'ಣ',
            'ತ', 'ಥ', 'ದ', 'ಧ', 'ನ',
            'ಪ', 'ಫ', 'ಬ', 'ಭ', 'ಮ',
            'ಯ', 'ರ', 'ಱ', 'ಲ', 'ವ', 'ಶ', 'ಷ', 'ಸ', 'ಹ', 'ಳ', 'ೞ'
        ],
        modifiers: ['್', 'ಾ', 'ಿ', 'ೀ', 'ು', 'ೂ', 'ೃ', 'ೄ', 'ೆ', 'ೇ', 'ೈ', 'ೊ', 'ೋ', 'ೌ', 'ಂ', 'ಃ']
    }
});