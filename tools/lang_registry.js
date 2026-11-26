(function () {
    const langFiles = [
        'lang_ta.js',
        'lang_ka.js',
        'lang_te.js',
        'lang_sa.js',
        'lang_en.js'
    ];

    langFiles.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    });
})();