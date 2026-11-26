window.registerPasuramLanguagePack({
    code: 'te',
    label: 'Telugu (te)',
    normalize(text) {
        if (!text) return '';
        return text
            .normalize('NFC')
            .replace(/\u0C46\u0C46/g, '\u0C47')
            .replace(/([\u0C05-\u0C39\u0C58-\u0C5A])([\u0C3E-\u0C4C])\u0C4D/g, '$1\u0C4D$2');
    },
    keyboard: {
        title: 'Telugu Virtual Keyboard (click to insert text)',
        vowels: ['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ', 'ఊ', 'ఋ', 'ౠ', 'ఌ', 'ౡ', 'ఎ', 'ఏ', 'ఐ', 'ఒ', 'ఓ', 'ఔ', 'అం', 'అః'],
        consonants: [
            'క', 'ఖ', 'గ', 'ఘ', 'ఙ',
            'చ', 'ఛ', 'జ', 'ఝ', 'ఞ',
            'ట', 'ఠ', 'డ', 'ఢ', 'ణ',
            'త', 'థ', 'ద', 'ధ', 'న',
            'ప', 'ఫ', 'బ', 'భ', 'మ',
            'య', 'ర', 'ఱ', 'ల', 'ళ', 'ఴ', 'వ', 'శ', 'ష', 'స', 'హ'
        ],
        modifiers: ['్', 'ా', 'ి', 'ీ', 'ు', 'ూ', 'ృ', 'ౄ', 'ె', 'ే', 'ై', 'ొ', 'ో', 'ౌ', 'ం', 'ః']
    }
});