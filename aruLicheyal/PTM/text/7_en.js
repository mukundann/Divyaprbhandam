window.MARKER_DATABASE = window.MARKER_DATABASE  { };

// Global function to trigger the merge on-demand
window.mergeLanguageTexts = function () {
    const text_bundle_en = {
        'PTM.7.1.steps': {

            1: " karavAmaDanAGu tan kanruLLinAr pOl maravAdaDiyEn unnaiyE azhaikkinrEn *** naravAr pozhil Soozh naraiyoor ninra nambi piravAmai enaippaNi endaipirAnE ",

            2: " vaRRA muduneeroDu mAlvaraiyEzhum tuRRA mun tuRRiya tol puhazhOnE *** aRREn aDiyEn unnaiyE azhaikkinrEn peRREn aruL tandiDu en endaipirAnE ",

            3: " tArEn pirarku unnaruL enniDaivaittAi ArEn aduvE parugikkaLikkinrEn *** kArEi kaDalE malaiyE tirukkOTTi oorE ugandAyai ugandaDiyEnE ",

            4: " puLvAi piLanda punidA enrazhaikka uLLE ninru ennuLLam kuLirumoruvA *** kaLvA kaDanmallaikkiDanda karumbE vaLLAl unnai enganam nAn marakkEnE ",
            5: " villEr nudal vEl neDungaNNiyum neeyum kallAr kaDungAnam tirinda kaLirE *** nallAi naranAraNanE engaL nambi SollAi unnaiyAn vANangi tozhumArE ",
            6: " paniyEi parangunrin pavaLattiraLE muniyE tirumoozhikkaLattu viLakkE *** iniyAi toNDarOm paruginnamudAya kaniyE unnaikkaNDu koNDu uindozhindEnE ",
            8: " attA ariyE enrunnai azhaikka pittAvenru pESuhinrAr pirarennai *** muttE maNimANikkamE muLaikkinra vittE unnai enganam nAn viDuhEnE ",
            9: " tooyAy chuDarmAmadipOl uyirkkellAm tAyAi aLikkinra taNtAmaraikkaNNA *** AyA valaineerulagEzhum munnuNDa vAyA unnai enganam nAn marakkEnE  ",
            10: " vaNDAr pozhil Soozh naraiyoor ninra nambikku enrum toNDAi kaliyan oliSei tamizhmAlai *** toNDeerivai pADumin pADi nirADa uNDE viSumbu un tamakku illai tuyarE ",


        },
        'PTM.7.2.steps': {
            1: " puLLAi EnamumAi pugundu ennai uLLam koNDa kaLvanenralum enkaNgaL neergaL chOrtarumAl*** uLLEninrurugi nenjam unnai uLLiyakkAl naLLEn unnaiyallAl naraiyoor ninra nambIyO ",
            2: " ODAvALariyin uruvAi maruvi entan mADEvandu aDiyEn manamkoLLavalla maindA *** pADEn toNDartammaikkavdaippanuval koNDu nADEn unnaiyallAl naRaiyoor ninRa nambIyO ",
            3: " emmAnum emmanaiyum ennaippeRRozhindadarpin ammAnum ammanaiyum aDiyEnukkAhi ninRa *** nanmAna oNSuDarE naraiyoor ninranambee un maimmAnavaNNamallAl magizhndEtta mATTEnE ",
            4: " SiraiyAyOr piLLaiyumAi ulahuNDOr Alilai mEl uraivAi ennenjinuLLE uraivAi uraindadutAn *** ariyAdirundariyEn aDiyEn aNivaNDukiNDum naraivArum pozhilSoozh naRaiyoor ninRa nambiyO ",
            6: " entAdai tAdaiyappAl ezhuvar pazhavaDimai vandAr ennenjinuLLEvandAyai pOgaloTTEn *** andO en AruyirE arasE aruLenakku nandAmal tanda endAi naRaiyoor ninRa nambeeyO ",
            7: " mannanja AyiramtOL mazhuvil tuNittamanidA ennejattuL irundu inginippOi piraroruvar *** vannenjam pukkirukkavoTTEn vaLaittuvaittEn nannenja annamannum naRaiyoor ninRa nambeeyO ",
            8: " eppOdum ponmalariTTu imaiyOr tozhudu tangaL kaippOdu koNDirainji kazhalmEl vaNanga ninrAi *** ippOdu ennenjinuLLE pugundAyai pOgaloTTEn narpOdu vaNDukiNDum naRaiyoor ninRa nambeeyO ",
            9: " oonErAkkaidannai uzhandOmbivaittamaiyAl yAnAi entanakkAi aDiyEn manam pugunda *** tEnE teengarumbin teLivE en SindaitannAl nAnE eidappeRREn naRaiyoor ninRa nambiyO ",
            10: " nanneer vayal puDaiSoozh naraiyoor ninra nambiyai kanneer mAlvaraittOL kalikanri mangaiyarkOn *** Sonneer Son mAlai SollluvArhaL SoozhviSumbil nanneermaiyAl magizhndu neDungAlam vAzhvArE ",
        },
        'PTM.7.3.steps': {
            1: " Sinavil SengaN arakkar uyir mALa SeRRavilliyenru kaRRavar tamtam manam uTkoNDu enrum eppOdum ninrEttum mAmuniyai maramEzheida maindanai *** nanavil Senru Arkum naNNarkariyAnai nAn aDiyEn naraiyoor ninRa nambiyai kanavil kaNDEn inru kaNDamaiyAl en kaNNigaigaL kaLippa kaLittEnE ",
            2: " tAi ninainda kanrEyokka ennaiyum tannaiyE ninaikkaSeidu tAn enak kAi ninaindu aruL Seyyum appanai anru ivvaiyagam uNDumizhndiTTa *** vAyanai makarakkuzhaikkAdanai iDaikazhi maindanai madiLkOval iDaikazhi Ayanai amararkariyERRai en anbanaiyanri yAdariyEnE ",
            3: " vandanALvandu ennenjiDam koNDAn maRROr nenjiraiyAn aDiyEnuDai SindaiyAi vandu tenpularkku ennai SEr koDAn idu sikkenappeRREn *** kondulAm pozhilSoozh kuDandaittalai kOvinai kuDamADiya koottanai endaiyai endaitandaitammAnai embirAnai ettAl marakkEnE ",
            4: " urangaLAl iyanra mannarmALa bAradattoru tEr aivarkAicheru irangioorndavarku innaruLSeyyum embirAnai vambAr punalkAviri *** arangamALi ennALi viNNALi AzhiSoozh ilangai malangaSenru SarangaLANDa taNDAmarai kaNNanukku anri en manam tAzhndu nillAdE ",
            5: " Angu vennaragattu azhunduambOdu anjElenru aDiyEnai angEvandu tAngu tAmaraiyanna ponnAraDi embirAnai umbarkaNiyAi ninRa *** vEngaDattariyai parikeeriyai veNNaiyuNDu uraliniDaiyAppuNDa teengarumbinai tEnai nanpAlinai anri en manam SindaiSeyyAdE ",
            6: " ettanai pozhudAgilum enRum en manattu agalAdirukkum pugazh taTTalartta ponnE alarkOngin tAzh pozhil tirumAlirumSOlai *** angattiyai karumbeenra in SARRai kAdalAl marainAngu munnOdiya paTTanai paravaittuyilERRai en paNbanai anri pADal SeyyEnE ",
            7: " paNNin inmozhiyAzh narambil peRRa pAlaiyAgi ingE pugundu en kaNNum nenjum vAyum iDangoNDAn koNDapin maraiyOr manam tannuL *** viNNuLAr perumAnai emmAnai veenguneer makaram tiLaikkum kaDal vaNNan mAmaNivaNNan em aNNal vaNNamE anri vAyuraiyAdE ",
            8: " ini eppAvam vandeidum Solveer emakku immaiyE aruL peRRamaiyAl aDum tuniyaitteerttu inbamE taruginradOr tORRa tonneriyai vaiyam tozhappaDum *** muniyai vAnavarAl vaNangappaDum muttinai pattartAm nugarhinradOr kaniyai kAdalseidu ennuLLam koNDa kaLvanai inru kaNDukoNDEnE ",
            9: " en seigEn aDiyEn uraiyeer idarku enrum enmanattE irukkum pugazh tanjaiyALiyai pon peyarOn nenjam anru iDandavanai tazhalEpurai *** min sei vALarakkan nagarpAzhpaDa Soozh kaDal sirai vaittu imaiyOr tozhum pOnSei mAlvaraiyai maNikkunRinai anri en manam pORRiyennAdE ",
            10: "tODuviNDalar poombozhil mangaiyar tOnral vATkaliyan tiruvAli nADan nannaraiyoor ninRa nambitan nallamAmalar SEvaDi Senniyil *** SooDiyum tozhudumezhundADiyum toNDarhaTkavan Sonna SolmAlai pADal pattivai pADumin toNDeer pADa nummiDaipAvam nillAvE ",
        },
        'PTM.7.4.steps': {
            1: " kaNsOra veNgurudi vandizhiya ventazhal pOl koondalALai maNsEra mulaiyunDa mAmadalAi ! vAnavar tam kOvE! enRu viNcheErum iLantiNgaL agaDu urinju maNimADa malgu Selva taNchERai emperumAn tAL tozhuvAr kANmin en talaimElArE ",
            2: " um puruva vari neDuNkaN alarmagaLai varai agalattu amarndu mallal komburuva viLaNkani mEl iLaN kanRu koNDeRinda koottar pOlAm vambalarum taNsOlai vaNchERai vAnundu kOyil mEya emperumAn tAL tozhuvAr eppozhudum en manattE irukkinRArE ",
            3: " meedODi vALeyiru minnilaga mun vilagum uruvinALai kAdODu koDimookku anruDan arutta kaittalattA! enRu ninRu tAdODu vaNDalambum taNchERai emperumAn tALai Etti pOdODu punal toovum puNNiyarE viNNavaril poliginRArE ",
            4: " tErALum vAL arakkan tennilaNgai venjamattu ponRi veezha pOrALum silaiyadanAl porukaNaigaL pOkkuvittAy enRu nALum tArALum varaimArban taNchERai emperumAn umbarALum pErALan pEr Odum periyOrai orukAlum pirikilEnE ",
            5: " vandikkum maRRavarkum mAsuDambil vallamaNar tamakkum allEn mundichEnru aRiyuruvAi irANiyanai muraNazhitta mudalvarkkallAl sandappoo malar chOlaitaNchERai emperumAn tALai nALum sindippArkku enuLLam tEnooRi eppozhudum tittikkumE ",
            6: " paNDu EnamAi ulagai anRiDanda paNbALA! enRu ninRu toNDAnEn tiruvaDiyE tuNaiyallAl tuNaiyilEn chollukinREn vaNDEndum malarpuRavil vaNchERai emperumAn aDiyAr tammai kaNDEnukku idu kANeer en nenjam kaN iNaiyum kaLikkumARE ",
            7: " paiviriyum variyaravil paDukaDaluL tuyil amarnda paNbA! enRum maiviriyum maNivarai pOl mAyavanE! enRenRum vaNDAr neelam seiviriyum taNchErai emperumAn tiruvaDiyai sindittERku en aiyaRivum koNDAnukku ALAnArkku ALAm en anbutAnE",
            8: " uNNAdu venkooRRam OvAda pAvaNgaL chErA mElai viNNOrum maNNOrum vandu irainjum men taLirpOl aDiyinAnai paNNAra vaNDiyambum paimbozhil soozh taNchErai ammAn tannai kaNNAra kaNDurugi kaiyAra tozhuvArai karuduNkAlE ",
            9: " kaLLattEn poy agattEn AdalAl pOdorukAl kavalai yennum veLLatERku enkolO? viLaivayaluL karuneelam kaLainjar tALLa tEn maNanARum taNchERai emperumAn tALai nALum uLLattE vaippArukku idukANeer en uLLam urugumArE ",
            10: " poomANchEr karuNkuzhalAr pOl naDandu vayal ninRa peDaiyODu annam tEmAvin innizhalil kaNtuyilum tANchERai ammAn tannai vAmAn tEr parakAlan kalikanRi olimAlai koNDu toNDeer! tU mANsEr ponnaDimEl sooTTumin num tuNaikkaiyAl tozhudu ninRE",

        },
        'PTM.7.5.steps': {
            1: "tandai kAlil peruvilangu tALavizha naLLiruTkaN vanda endai perumAnAr maruvininRa oorpOlum *** mundivAnam mazhai pozhiya moovAvuruvil maRaiyALar andimoonRum analOmbum aNiyAr veedi azhundoorE ",
            2: "pArittezhunda paDaimannar tammaimALa bAradattu tEril pAganAyoornda dEvadEvan oorpOlum *** neeril paNaittaneDuvALaikku anjippOna kuruginangaL Aral kavuLODu arukaNaiyum aNiyAr vayal soozh azhundoorE ",
            3: "semponmadiL soozh tennilangaikku iRaivan sirangaL aiyiraNDum umbar vALikku ilakkAga udirtta uravOn oorpOlum *** kombilArnda mAdavimEl kOdimEinda vaNDinangaL ambarAvum kaNmaDavAr aimbAlaNaiyum azhundoorE ",
            4: "veLLattuLLOr AlilaimEl mEvi aDiyEn manampugundu en uLLattuLLum kaNNuLLum ninRAr ninRa oor pOlum *** puLLuppiLLaikku iraitEDi pOna kAdal peDaiyODum aLLal seRuvil kayal nADum aNiyArvayalsoozh azhundoorE ",
            5: "pagalum iravum tAnEyAi pArum viNNum tAnEyAi nigaril chuDarAi iruLAgi ninrAr ninRa oor pOlum *** tugilim koDiyum tErtugaLum tunnimAdar koondalvAy agilin pugaiyAl mugilEikkum aNiyAr veedi azhundoorE ",
            6: " EDilangu tAmarai pOl chevvAy muRuval seidaruLi mADuvandu en manam pugundu ninRAr ninra oor pOlum *** neeDu mADattanich choolam pOzha koNDal tuLitoova ADalaravattu ArppuOvA aNiyAr veedi azhundoorE ",
            7: "mAlaippugundu malaraNaimEl vaigi aDiyEn manam pugundu en neelakkaNgaL panimalga ninRAr ninRa oorpOlum*** vElaikkaDalpOl neDuveedi viNtOy sudai veN maNimADattu AlaippugaiyAl azhal kadirai maraikkum veedi azhundoorE ",
            8: " vanjimarungul iDainOva maNanduninRa kanavagattu en nenju niraiyakkaikooppi ninRAr ninRa oor pOlum *** panjiyanna mellaDi nalpAvaimArgaL ADagattin anjilambin ArppuOvA aNiyAr veedi azhundoorE ",
            9: "en aimbulanum ezhilum koNDu ingE nerunal ezhundaruLi ponnamkalaigaL meliveida pOna punidar oorpOlum *** mannum muduneer aravindamalar mEl varivaNDisaipADa annam peDaiyODu uDanADum aNiyAr vayalSoozh azhundoorE ",
            10: "nellil kuvaLaikaNkATTi neerilkumudam vAikATTa alli kamalam mugam kATTum kazhani azhundoor ninRAnai *** valli pOdumbil kuyilkoovum mangaivEndan parakAlan sollil polinda tamizhmAlai solla pAvam nillAvE ",


        },
        'PTM.7.6.steps': {
        },
        'PTM.7.7.steps': {
            1: "tiruvukkum tiruvAgiya SelvA deivattukkaraSE SeyyakaNNA uruvaSenjuDarAzhivallAnE  ulaguNDa oruvA tirumArbA *** oruvarkARRi uikum vagai inrAluDan ninru aivar ennuL pugundu ozhiyAdu aruvittinriDa anji ninnaDaindEn azhundoor mEltiSaininRa ammAnE ",
            2: "pandArmel viral nalvaLaittOLi pAvai poomagaL tannoDum uDanE vandAi en manattE mannininRAi mAlvaNNA mazhaipOl oLivaNNA *** SandOgApouzhiyA taittireeyA sAmavEdiyanE neDumAlE andO ninaDiyanri maRRariyEn azhundoor mEltiSaininRa ammAnE ",
            3: "neyyAr Azhiyum Sangamum Endum neeNDa tOLuDaiyAi aDiyEnai SeiyyAda ulagattiDai SeidAi Sirumaikkum perumaikkum uLpugundu *** poyyAl aivar en mei kuDiyEri pORRi vAzhvadarkanji ninnaDaindEn aiyA ninaDiyanri maRRariyEn azhundoor mEltiSaininRa ammAnE ",
            4: "paranE panjavan pouzhiyan sOzhan pArmannar mannartAm paNindEttum varanE mAdavanE madusoodA maRROr naltuNai ninalAl ilEn kAN *** naranE nAraNanE tirunaraiyoor nambee emberumAn umbarALum aranE AdivarAgam mun AnAi azhundoor mEltiSaininRa ammAnE ",
            5: "viNDAn viNpuga venjamattariyAi pariyOn mArvagam paRRipiLandu paNDAnuyya Or mAlvarai Endum paNbALA paranE pavittiranE *** kaNDEn nAn kaliyugattadan tanmai karumamAvadum en tanakku arindEn aNDA ninaDiyanri maRRariyEn azhundoor mEltiSaininRa ammAnE ",
            6: " tOyAvin tayir neyyamuduNNa SonnAr Sollinahum pariSE peRRa tAyAl AppuNDirundu azhudu Engum tADALA taraiyOrkkum viNNOrkkum *** SEyAi krEta trEta dwApara kaliyugam ivai nAngum mun AnAi AyA ninaDiyanri maRRaiyEn azhundoor mEltiSaininRa ammAnE ",
            7: "karuttukkanjanai anja munindAy kArvaNNA kaDal pOl oLivaNNA iruttiTTAn viDaiyEzhum mun venrAi endAi andaramEzhum mun AnAi *** poruttu koNDirundAl porukkoNNA bOgamE nugarvAn pugundu aivar aruttuttinriDa anji nin aDaindEn azhundoor mEltiSaininRa ammAnE ",
            8: "neDiyAnE kaDiyAr kali nambee ninnaiyE ninaindu ingiruppEnai kaDiyAr kALaiyar aivar pugundu kAvalseida akkAvalai pizhaittu*** kuDipOndu unaDikkeezh vandu pugundEn koorai SOrivai tandu enakkaruLi aDiyEnai paNiyANDukoL endAi azhundoor mEltiSaininRa ammAnE ",
            9: " kOvAi aivar en mei kuDiyEri kooraiSOrivai tAvenru kumaittu pOgAr nAnavarai porukkagillEn punidA puTkoDiyAi neDumAlE *** teevAi nAgaNaiyil tuyilvAnE tirumAlE iniSeivadonrariyEn AvAvenru aDiyErkku irai irangAi azhundoor mEltiSaininRa ammAnE ",
            10: "anna mannu paimbozhil soozhnda azhundoor mEltiSai ninRa ammAnai kannimannu tiNtOL kalikanri AlinADan mangaikkulavEndan *** Sonna in tamizh nanmaNikkOvai tooyamAlai ivaipattumvallAr manni mannavarAi ulagANDu mAnaveN kuDaikkeezh magizhvArE ",


        },
        'PTM.7.8.steps': {
            1: "sengamala tirumagaLum puviyum sembon tiruvaDiyin iNaivaruDa munivarEtta vangamali taDangaDaluL anandanennum variyaravin aNaittuyinra mAyOn kANmin *** engumali niraipugazh nAlvEdam aindu vELvihaLum kELvihaLum iyanra tanmai angamalattu AyananaiyAr payilum Selvattu aNiazhundoor ninruganda amarar kOvE ",
            2: " mun ivvulagEzhum iruL maNDiyuNDa munivaroDu dAnavarhaL tiSaippa vandu pannu kalai nAl vEda poruLaiyellAm parimugamAi aruLiya em paraman kANmin  sennelmali kadirkavari veeSa Sangam avaimurala Sengamala malaraiyEri annamali peDaiyODum amarum Selvattu aNiazhundoor ninruganda amarar kOvE ",
            3: " kulattalaiya madavEzham poigai pukku kOL mudalai piDikka adarku anungininru nilattigazhum malar chuDarEi chOdeeyenna nenjiDar teerttaruLiya en nimalan kANmin *** malaittigaL sandagil kanaka maNiyumkoNDu vandundi vayalgaLdorum maDaihaL pAya alaittuvarum ponnivaLam perugumSelvattu aNiazhundoor ninruganda amarar kOvE ",
            4: " Silambu mudal kalanaNindOr SengaNkunram tigazhndadenattiruvuruvam panriyAgi ilangu puvimaDandaitannai iDandu pulgi eyiRRiDai vaittaruLiya emmeeSan kANmin  pulambuSirai vaNDolippa poogam tokka pozhilgaL dOrum kuyilkoova mayilgaLAla alambutirai punal puDaiSoozhndu azhagAr Selvattu aNiazhundoor ninruganda amarar kOvE ",
            5: " SinamEvumaDalariyin uruvamAgi tiral mEvum iraNiyanadAgam keeNDu manamEvu vanjanaiyAl vandapEichchi mALa uyir vavviya em mAyOn kANmin *** inamEvu varivaLaikkai EndumkOvai Ei vAi maragadam pOl kiLiyin inSol anamEvu naDai maDavAr payilum Selvattu aNiazhundoor ninruganda amarar kOvE",
            6: " vAnavar tam tuyar teeravandu tOnri mANuruvAi moovaDi mAvaliyaivENDi tAnamara Ezhulahum aLandavenri tanimudal chakkarappaDai en talaivan kANmin *** tEnamarum pozhiltazhuvum ezhilkoL veedi SezhumADa mALihaihaL kooDandOrum Anatol Seer maraiyALar payilum Selvattu aNiazhundoor ninruganda amarar kOvE ",
            7: " pandaNainda mel viralAL SeetaikkAgi pagalavan meediyangAda ilangaivEndan andamil tiNkaram SirangaL puraNDuveezha aDukaNaiyAl eiduganda ammAnkANmin *** Sendamizhum vaDakalaiyum tihazhndanAvar tiSaimuganai anaiyavarhaL Semmai mikka andaNar tam Ahutiyin pugaiyAr Selvattu aNiazhundoor ninruganda amarar kOvE ",
            8: " kumbamihu madavEzham kulaiya kombu parittu mazhaviDaiyaDarttu kuravaikOttu vambavizhum malarkuzhalAL Aichchivaitta tayirveNNei uNDuganda mayOnkANmin *** SembavaLam maragadam nalmuttum kATTa tihaLpAgam kadali palavaLam mikkengum ambonmadiL pozhil puDaiSoozhndu azhagAr Selvattu aNiazhundoor ninruganda amarar kOvE ",
            9: " ooDEru kanjanoDu mallum villum oNkariyum uruL SakaDum uDaiya cheRRa neeDEru peruvali tOLuDaiya venri nilavu pugazh nEmiyangai neDiyOn kANmin *** SEDEru pozhil tazhuvum ezhilkoLveedi tiruvizhavil maNiyaNinda tiNNaidOrum ADEru malarkuzhalAr payilum Selvattu aNiazhundoor ninRuganda amarar kOvE ",
            10: " panRiyAi meenAi ariyAi pArai paDaittu kAttu uNDumizhnda paramantannai anramararku adipadiyum ayanum SEyum aDipaNiya aNiazhundoor ninRakOvai *** kanri neDuvEl valavan AlinADan kalikanri oliSeida inbappADal onrinoDu nAngum Oraindum vallAr olikaDalSoozh ulagALum umbartAmE ",

        },
        'PTM.7.9.steps': {

        },
        'PTM.7.10.steps': {
        },

    };
    // Non-destructive runtime merging engine

    for (const key in text_bundle_en) {
        window.MARKER_DATABASE[key] = window.MARKER_DATABASE[key][];
        for (const p in text_bundle_en[key]) {
            const idx = parseInt(p) - 1;
            window.MARKER_DATABASE[key][idx] = window.MARKER_DATABASE[key][idx]  { p: parseInt(p) };
            window.MARKER_DATABASE[key][idx]['text'] = window.MARKER_DATABASE[key][idx]['text']  { };
            window.MARKER_DATABASE[key][idx]['text']['en'] = text_bundle_en[key][p];
        }
    }
};
