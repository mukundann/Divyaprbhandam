window.MARKER_DATABASE = window.MARKER_DATABASE || {};

window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'TVM.5.1.steps': {
            1: "🙏 kaiyAr chakkaraththu * en karu mANikkamE! enRenRu * poyyE kaimmai sollip * puRamE puRamE ADi *** meyyE peRRu ozhindhEn * vidhi vAykkinRu kAppAr Ar? * aiyO! kaNNa pirAn! * aRaiyO! inip pOnAlE",
            2: "pOnAy! mA marudhin naDuvE * en pollA maNiyE! * thEnE! in amudhE! * enRenRE sila kUththuch solla *** thAnEl emperumAn * avan en Agi ozhindhAn * vAnE mA nilamE * maRRu muRRum en uLLanavE",
            3: "uLLana maRRuLavAp * puRamE sila mAyam solli * vaLLal! maNi vaNNanE! * enRenRE unnaiyum vanjchikkum *** kaLLa manam thavirndhE * unnaik kaNDu koNDu uyndhu ozhindhEn * veLLaththaNaik kiDandhAy * ini unnai viTTu en koLvanE?",
            4: "en koLvan? unnai viTTu ennum * vAsagangkaL solliyum * van kaLvanEn manaththai valiththuk * kaNNa nIr karandhu *** nin kaN nerungka vaiththE * enadhAviyai nIkka killEn * en kaN malinam aRuththu * ennaik kUvi aruLAy kaNNanE!",
            5: "kaNNa pirAnai * viNNOr karu mANikkaththai amudhai * naNNiyum naNNa killEn * naDuvE Or uDambil iTTu *** thiNNam azhundhak kaTTip * pala sey vinai vankayiRRAl * puNNai maRaiya varindhu * ennaip pOra vaiththAy puRamE",
            6: "puRam aRak kaTTik koNDu * iru valvinaiyAr kumaikkum * muRai muRai Akkai pugal ozhiyak * kaNDu koNDu ozhindhEn *** niRam uDai nAl thaDanthOL * seyya vAy seyya thAmaraik kaN * aRa muyal Azhi angkaik * karu mEni ammAn thannaiyE",
            7: "ammAn Azhip pirAn * avan evviDaththAn? yAn Ar? * emmA pAviyarkkum * vidhi vAykkinRu vAykkum kaNDIr *** kaimmA thunbozhiththAy! enRu * kai thalai pUsal iTTE * mey mAlAy ozhindhEn * empirAnum en mElAnE",
            8: "mElAth thEvargaLum * nilath thEvarum mEvith thozhum * mAlAr vandhu ina nAL * aDiyEn manaththE manninAr *** sElEy kaNNiyarum * perunjchelvamum nanmakkaLum * mElAth thAy thandhaiyum * avarE ini AvArE",
            9: "AvAr Ar? thuNai enRu * alai nIrk kaDaluL azhundhum nAvAy pOl * piRavik kaDaluL * ninRu nAn thuLangka *** thEvAr kOlaththoDum * thiruchchakkaram sangkinoDum * AvA! enRu aruL seydhu * aDiyEnoDum AnAnE",
            10: "AnAn AL uDaiyAn enRu * aqdhE koNDu ugandhu vandhu * thAnE innaruL seydhu * ennai muRRavum thAn AnAn *** mInAy AmaiyumAy * narasingkamumAyk kuRaLAy * kAnAr EnamumAyk * kaRkiyAm innam kAr vaNNanE",
            11: "🙏 kAr vaNNan kaNNa pirAn * kamalath thaDangkaNNan thannai * Er vaLa oNkazhanik * kurugUrch saTakOpan sonna *** sIr vaNNa oNthamizhgaL * ivai AyiraththuL ippaththum * Ar vaNNaththAl uraippAr * aDik kIzh puguvAr polindhE",
        },
        'TVM.5.2.steps': {
            1: "🙏 poliga poliga poliga * pOyiRRu valluyirch sAbam * naliyum naragamum naindha * namanukku ingku yAdhonRum illai *** kaliyum keDum kaNDu koNmin * kaDal vaNNan pUdhangkaL maN mEl * maliyap pugundhu isai pADi * ADi uzhi tharak kaNDOm",
            2: "kaNDOm kaNDOm kaNDOm * kaNNukku iniyana kaNDOm * thoNDIr! ellIrum vArIr * thozhudhu thozhudhu ninRArththum *** vaNDAr thaN anthuzhAyAn * mAdhavan pUdhangkaL maN mEl * paN thAn pADi ninRu ADip * parandhu thiriginRanavE",
            3: "thiriyum kali yugam nIngkith * dhEvargaL thAmum pugundhu * periya kidha yugam paRRip * pEr inba veLLam peruga *** kariya mugil vaNNan emmAn * kaDal vaNNan pUdhangkaL maN mEl * iriyap pugundhu isai pADi * engkum iDam koNDanavE",
            4: "iDangkoL samayaththai ellAm * eDuththuk kaLaivana pOlE * thaDangkaDal paLLip perumAn * thannuDaip pUdhangkaLE Ay * kiDandhum irundhum ezhundhum * kItham pala pala pADi * naDandhum paRandhum kuniththum * nADagam seyginRanavE",
            5: "seyginRadhu en kaNNukku onRE * okkinRadhu ivvulagaththu * vaikundhan pUdhangkaLE Ay * mAyaththinAl engkum manni *** aiyam onRillai * arakkar asurar piRandhIr uLLIrEl * uyyum vagai illai thoNDIr! * Uzhi peyarththiDum konRE",
            6: "konRu uyir uNNum visAdhi * pagai pasi thIyana ellAm * ninRu ivvulagil kaDivAn * nEmip pirAn thamar pOndhAr *** nanRu isai pADiyum thuLLi ADiyum * njAlam parandhAr * senRu thozhudhu uymmin thoNDIr! * sindhaiyaich senniRuththiyE",
            7: "niRuththi num uLLaththuk koLLum * dheyvangkaL ummai uyyak kOL * maRuththum avanODE kaNDIr * mArkkaNDEyanum kariyE *** kaRuththa manam onRum vENDA * kaNNan allAl dheyvam illai * iRuppadhu ellAm * avan mUrththiyAy avarkkE iRuminE",
            8: "iRukkum iRai iRuththu uNNa * evvulagukkum than mUrththi * niRuththinAn theyvangkaL Aga * aththeyva nAyagan thAnE *** maRuth thiru mArvan avan than * pUdhangkaL kIdhangkaL pADi * veRuppinRi njAlaththu mikkAr * mEvith thozhudhu uymmin nIrE",
            9: "mEvith thozhudhu uymmin nIrgaL * vEdhap punidha irukkai * nAvil koNDu achchudhan thannai * njAna vidhi pizhaiyAmE *** pUvil pugaiyum viLakkum * sAndhamum nIrum malindhu * mEvith thozhum aDiyArum * pagavarum mikkadhu ulagE",
            10: "mikka ulagugaL thORum * mEvik kaNNan thiru mUrththi * nakka pirAnODu * ayanum indhiranum mudhalAga *** thokka amarar kuzhAngkaL * engkum parandhana thoNDIr! * okkath thozha kiRRir Agil * kali yugam onRum illaiyE",
            11: "🙏 kali yugam onRum inRikkE * than aDiyArkku aruL seyyum * maliyum suDar oLi mUrththi * mAyap pirAn kaNNan thannai *** kali vayal thennan kurugUrk * kAri mARan saTakOpan * oli pugazh Ayiraththu ippaththu * uLLaththai mAsu aRukkumE",
        },
        'TVM.5.3.steps': {
            1: "🙏 mAsaRu sOdhi * en seyya vAy maNik kunRaththai * AsaRu sIlanai * Adhi mUrththiyai nADiyE *** pAsaRavu eydhi * aRivu izhandhu enai nALaiyam? * EsaRum Uravar kavvai * thOzhI! en seyyumE?",
            2: "en seyyum Uravar kavvai? * thOzhI! ini nammai * en seyya thAmaraik kaNNan * ennai niRai koNDAn *** mun seyya mAmai izhandhu * mEni melivu eydhi * en seyya vAyum karungkaNNum * payappu UrndhavE",
            3: "Urndha sagaDam * udhaiththa pAdhaththan * pEy mulai sArndhu suvaiththa sevvAyan * ennai niRai koNDAn *** pErndhum peyarndhum * avanODu anRi Or sollilEn * thIrndha en thOzhI! * en seyyum Uravar kavvaiyE?",
            4: "Uravar kavvai eru iTTu * annai sol nIr paDuththu * Ira nel viththi muLaiththa * nenjchap perunjcheyuL *** pEr amar kAdhal * kaDal puraiya viLaiviththa * kAr amar mEni * nam kaNNan thOzhI! kaDiyanE?",
            5: "kaDiyan koDiyan neDiya mAl * ulagam koNDa aDiyan * aRivaru mEni mAyaththan *** Agilum koDiya en nenjcham * avan enRE kiDakkum ellE! * thuDi koL iDai maDath thOzhI! * annai en seyyumE?",
            6: "annai en seyyil en? * Ur en sollil en? thOzhimIr! * ennai ini umakku Asai illai * agappaTTEn *** munnai amarar mudhalvan * vaNthuvarApathi mannan * maNi vaNNan * vAsudhEvan valaiyuLE",
            7: "valaiyuL agappaDuththu * ennai nal nenjcham kUvik koNDu * alai kaDal paLLi ammAnai * Azhip pirAn thannai *** kalai koL agal algul thOzhI! * nam kaNgaLAl kaNDu * thalaiyil vaNangkavum AngkolO? * thaiyalAr munbE",
            8: "pEy mulai uNDu sagaDam pAyndhu * marudhiDaip pOy mudhal sAyththu * puL vAy piLandhu kaLiRaTTa *** thU muRuval thoNDai vAyp pirAnai * ennAL kolO? * yAm uRuginRadhu thOzhI! * annaiyar nANavE",
            9: "nANum niRaiyum kavarndhu * ennai nal nenjcham kUvik koNDu * sEN uyar vAnaththu irukkum * dhEva pirAn thannai *** ANai en? thOzhI! * ulagu thORu alar thURRi * Am kONaigaL seydhu * kudhiriyAy maDal UrdhumE",
            10: "yAm maDal Urndhum * em Azhi angkaip pirAnuDai * thU maDal thaN anthuzhAy * malar koNDu sUDuvOm *** yAm maDam inRith * theruvu thORu ayal thaiyalAr * nA maDangkap pazhi thURRi * nADum iraikkavE",
            11: "🙏 iraikkum karungkaDal vaNNan * kaNNa pirAn thannai * viraik koL pozhil * kurugUrch saTakOpan sonna *** niraik koL andhAdhi * Or AyiraththuL ippaththum * uraikka vallArkku * vaikundham Agum tham Ur ellAm",
        },
        'TVM.5.4.steps': {
            1: "🙏 Ur ellAm thunjchi * ulagellAm naLLiruLAy * nIr ellAm thERi * Or nIL iravAy nInDadhAl *** pAr ellAm uNDa * nam pAmbaNaiyAn vArAnAl * Ar? ellE! valvinaiyEn * Avi kAppAr iniyE",
            2: "Avi kAppAr ini yAr? * Azh kaDal maN viN mUDi * mA vikAramAy * Or valliravAy nInDadhAl *** kAvi sEr vaNNan * en kaNNanum vArAnAl * pAviyEn nenjchamE! * nIyum pAngku allaiyE",
            3: "nIyum pAngku allai kAN * nenjchamE! nIL iravum * Oyum pozhudhu inRi * UzhiyAy nINDadhAl *** kAyum kaDunjchilai * en kAguththan vArAnAl * mAyum vagai aRiyEn * valvinaiyEn peN piRandhE",
            4: "peN piRandhAr eydhum * perunthuyar kANgilEn enRu * oN suDarOn * vArAdhu oLiththAn *** immaN aLandha kaN periya sevvAy * engkAr ERu vArAnAl * eN periya sindhai nOy * thIrppAr Ar ennaiyE?",
            5: "Ar ennai ArAyvAr? * annaiyarum thOzhiyarum * nIr ennE? ennAdhE * nIL iravum thunjchuvarAl *** kAr anna mEni * nam kaNNanum vArAnAl * pEr ennai mAyAdhAl * valvinaiyEn pin ninRE",
            6: "pin ninRa kAdhal nOy * nenjcham peridhu aDumAl * mun ninRu irA Uzhi * kaN pudhaiya mUDiRRAl *** man ninRa chakkaraththu * em mAyavanum vArAnAl * inninRa nIL Avi * kAppAr Ar ivviDaththE?",
            7: "kAppAr Ar ivviDaththu? * kangkiruLin nuN thuLiyAy * chETpAladhu UzhiyAych * selginRa kangkul vAy *** thUp pAla veNsangku * chakkaraththan thOnRAnAl * thIp pAla valvinaiyEn * dheyvangkAL! en seygEnO?",
            8: "dheyvangkAL! en seygEn? * Or iravu Ezh UzhiyAy * mey vandhu ninRu * enadhAvi melivikkum *** kai vandha chakkaraththu * en kaNNanum vArAnAl * thaivandha thaNthenRal * venjchuDaril thAn aDumE",
            9: "venjchuDaril thAn aDumAl * vIngkiruLin nuN thuLiyAy * anjchuDara veyyOn * aNi neDunthEr thOnRAdhAl *** senjchuDarth thAmaraik kaN * selvanum vArAnAl * nenjchiDar thIrppAr ini yAr? * ninRu uruguginREnE",
            10: "ninRu uruguginREnE pOla * neDu vAnam * senRu urugi nuN thuLiyAych * selginRa kangkul vAy *** anRu orukAl vaiyam * aLandha pirAn vArAn enRu * onRu orukAl sollAdhu * ulagO uRangkumE",
            11: "🙏 uRangkuvAn pOl * yOgu seydha perumAnai * siRandha pozhil sUzh * kurugUrch saTakOpan sol *** niRam kiLarndha andhAdhi * Ayiraththu ippaththAl * iRandhu pOy vaikundham * sErA ARu engnganEyO?",
        },
        'TVM.5.5.steps': {
        },
        'TVM.5.6.steps': {
        },
        'TVM.5.7.steps': {
        },
        'TVM.5.8.steps': {
        },
        'TVM.5.9.steps': {
        },
        'TVM.5.10.steps': {
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