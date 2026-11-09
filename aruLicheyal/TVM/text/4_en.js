

window.MARKER_DATABASE = window.MARKER_DATABASE || {};

window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'TVM.4.1.steps': {
            1: "🙏 oru nAyagamAy * ODa ulaguDan AnDavar * karu nAy kavarndha kAlar * sidhaigiya pAnaiyar *** peru nADu kANa * immaiyilE pichchai thAm koLvar * thiru nAraNan thAL * kAlam peRach sindhiththu uymminO",
            2: "uymmin thiRai koNarndhu * enRu ulagAnDavar * immaiyE tham in suvai maDavAraip * piRar koLLath thAm viTTu *** vem min oLi veyil * kAnagam pOyk kumai thinbargaL * sem min muDith thirumAlai * viraindhu aDi sErminO",
            3: "aDi sEr muDiyinar Agi * arasargaL thAm thozha * iDi sEr murasangkaL * muRRaththu iyamba irundhavar *** poDi sEr thugaLAyp pOvargaL * Adhalil nokkena * kaDi sEr thuzhAy muDik * kaNNan kazhalgaL ninaiminO",
            4: "ninaippAn pugil kaDal ekkalil * nuNmaNalin palar * enaiththOr ugangkaLum * ivvulagu ANDu kazhindhavar *** manaippAl marungkaRa * mAydhal allAl maRRuk kaNDilam * panaith thAL madha kaLiRu aTTavan * pAdham paNiminO",
            5: "paNimin thiru aruL ennum * amsIdhap paimpUm paLLi * aNi menkuzhalAr * inbak kalavi amudhunDAr *** thuNi munbu nAlap * pal Ezhaiyar thAm izhippach selvar * maNi minnu mEni * nam mAyavan pEr solli vAzhminO",
            6: "vAzhndhArgaL vAzhndhadhu * mA mazhai mokkuLin mAyndhu mAyndhu * AzhndhAr enRallAl * anRu mudhal inRu aRudhiyA *** vAzhndhArgaL vAzhndhE niRpar * enbadhillai niRkuRil * AzhndhAr kaDaR paLLi * aNNal aDiyavar AminO",
            7: "Am in suvai avai * ARODu aDisil uNDu Arndha pin * thU men mozhi maDavAr irakkap * pinnum thuRRuvAr *** Imin emakkoru thuRRu enRu * iDaRuvar Adhalin * kOmin thuzhAy muDi * Adhi anjchOdhi guNangkaLE",
            8: "guNangkoL niRai pugazh mannar * koDaik kaDan pUNDirundhu * iNangki ulaguDan Akkilum * Angku avanai illAr *** maNangkoNDa bOgaththu manniyum * mILvargaL mILvillai * paNangkoL aravaNaiyAn * thiru nAmam paDiminO",
            9: "paDi mannu palkalan paRRODu aRuththu * aimpulan venRu * seDi mannu kAyam seRRArgaLum * Angku avanai illAr *** kuDi mannum in suvarkkam eydhiyum * mILvargaL mILvillai * koDi mannu puL uDai * aNNal kazhalgaL kuRuguminO",
            10: "kuRuga miga uNarvaththoDu nOkki * ellAm viTTa * iRugal iRappu ennum * njAnikkum appayan illaiyEl *** siRuga ninaivadhOr pAsam uNDAm * pinnum vIDillai * maRugal il Isanaip paRRi * viDAviDil vIDu aqdhE",
            11: "🙏 aqdhE uyyap pugum ARenRu * kaNNan kazhalgaL mEl * koy pUm pozhil sUzh * kurugUrch saTakOpan kuRREval *** sey kOlaththu Ayiram * sIrth thoDaip pADal ivai paththum * aqgAmal kaRpavar * Azh thuyar pOy uyyaRpAlarE",
        },
        'TVM.4.2.steps': {
        },
        'TVM.4.3.steps': {
        },
        'TVM.4.4.steps': {
        },
        'TVM.4.5.steps': {
        },
        'TVM.4.6.steps': {
        },
        'TVM.4.7.steps': {
        },
        'TVM.4.8.steps': {
        },
        'TVM.4.9.steps': {
        },
        'TVM.4.10.steps': {
        },
    };
    // Non-destructive runtime merging engine
    for (const key in text_bundle_ta) {
        window.MARKER_DATABASE[key] = window.MARKER_DATABASE[key] || [];
        for (const p in text_bundle_ta[key]) {
            const idx = parseInt(p) - 1;
            window.MARKER_DATABASE[key][idx] = window.MARKER_DATABASE[key][idx] || { p: parseInt(p) };
            window.MARKER_DATABASE[key][idx]['text'] = window.MARKER_DATABASE[key][idx]['text'] || {};
            window.MARKER_DATABASE[key][idx]['text']['en'] = text_bundle_en[key][p];
        }
    }
};