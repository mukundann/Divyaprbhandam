window.registerPasuramLanguagePack({
    code: 'sa',
    label: 'Sanskrit (sa)',
    normalize(text) {
        if (!text) return '';
        return text.normalize('NFC');
    },
    keyboard: {
        title: 'Sanskrit Virtual Keyboard (click to insert text)',
        vowels: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ॡ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'],
        consonants: [
            'क', 'ख', 'ग', 'घ', 'ङ',
            'च', 'छ', 'ज', 'झ', 'ञ',
            'ट', 'ठ', 'ड', 'ढ', 'ण',
            'त', 'थ', 'द', 'ध', 'न',
            'प', 'फ', 'ब', 'भ', 'म',
            'य', 'र', 'ल', 'ళ', 'व', 'श', 'ष', 'स', 'ह'
        ],
        modifiers: ['्', 'ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'ॄ', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः', 'ँ']
    }
});