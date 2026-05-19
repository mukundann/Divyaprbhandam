// marker.js - Your Pasuram Database

// marker.js - Structural Rules + Timing Markers

window.PASURAM_STRUCTURE = {
    'TVM': { hasSub: true,  maxCh: 10, maxSub: 10, defPas: 11, ex: {'2.7': 13} },
    'PT':  { hasSub: true,  maxCh: 11, maxSub: 10, defPas: 10, ex: {} },
    'PMT': { hasSub: false, maxCh: 10, defPas: 10, ex: {} },
    'NAT': { hasSub: false, maxCh: 14, defPas: 10, ex: {} }
};

window.MARKER_DATABASE = {
    // Periya Thirumozhi (PT)
    'PT.1.1.6': [0.86, 4.21, 8.35, 12.54, 16.63, 20.80],
    
    // Thiruvaimozhi (TVM)
    'TVM.1.1.1': [0.50, 4.20, 8.10, 12.30, 16.40, 19.50],
    'PMT.1.all': [9.13, 35.91, 61.56, 87.65, 113.36, 138.11, 163.92, 189.78, 215, 241.52, 265.43],
    'PMT.2.all' : [19.37,38.58,  58.13,  78.07,96.96,117.32,  136.1,  154.77,  174.17,194.03,202.29],
    'PMT.3.all' : [ 14.08, 26.76,39.11,  52.43,  65.35,  77.8,  92.14,  106.13,  120.07],
    'PMT.4.all' : [15.50, 31.36, 47.17, 64.34, 81.25, 97.85, 115.72, 130.40, 148.75, 163.81, 180.61],
    'PMT.5.all' : [17.79, 34.30, 51.79, 67.83, 86.04, 102.52, 118.63, 134.79, 150.59, 166.28, 176.11],

// Add or append this block to your existing marker.js file
'PMT.2.steps' : [
  { "p": 1, "text": "thEttarum thiRal thEninaith * thennaranganai * thirumAdhu vAzh vAttamil vanamAlai mArvanai vAzhththi * mAlkoL sindhaiyarAy * AttamEvi alandhazhaiththu * ayarveydhum meyyadiyArgaL tham * Ittam kaNdidak kUdumEl * adhu kANum kaN payan AvadhE *", "step1": [[0,2.4],[2.4,3.5],[3.5,7.2],[7.2,9],[9,11.5],[11.5,14.32],[14.32,16.5],[16.5,19.03]], "step2": [[0,3.5],[3.5,9],[9,14.32],[14.32,19.03]], "step3": [[0,9],[9,19.03]], "step4": [0,19.03] },
  { "p": 2, "text": "thOdulA malarmangai thOLiNai thOyndhadhum * sudar vALiyAl * nIdu mAmaram seRRadhum nirai mEyththadhum * ivaiyE ninaindhu * AdippAdi arangavO! enRazhaikkum * thoNdaradippodi Ada nAm peRil * gangai nIr kudainthAdum * vEtkai ennAvadhE? *", "step1": [[19.03,22.35],[22.35,23.9],[23.9,26.85],[26.85,29],[29,31.68],[31.68,34.21],[34.21,36.5],[36.5,38.5]], "step2": [[19.03,23.9],[23.9,29],[29,34.21],[34.21,38.5]], "step3": [[19.03,29],[29,38.5]], "step4": [19.03,38.5] },
  { "p": 3, "text": "ERadarththadhum EnamAy nilam kINdadhum * mun irAmanAy * mARadarththadhum maNNaLandhadhum * sollip pAdi * vaNponnippE rARu pOl varum kaNNanIr koNdu * arangan kOyil thirumuRRam * sERu sey thoNdar sEvadich * chezhunjERu en sennikku aNivanE *", "step1": [[38.5,41.3],[41.3,42.77],[42.77,45],[45,46.6],[46.6,50.7],[50.7,53.23],[53.23,55.45],[55.45,57.98]], "step2": [[38.5,42.77],[42.77,46.6],[46.6,53.23],[53.23,57.98]], "step3": [[38.5,46.6],[46.6,57.98]], "step4": [38.5,57.98] },
  { "p": 4, "text": "thOyththa thaN thayir veNNey pAludan uNdalum * udanRAychchi kaNdu * Arththa thOLudai empirAn * en aranganukku adiyArgaLAy * nAththazhumbezha nAraNA enRazhaiththu * mey thazhumbath thozhudhu Eththi * inbuRum thoNdar sEvadi * Eththi vAzhththum en nenjamE *", "step1": [[57.98,61.5],[61.5,63.4],[63.4,65.34],[65.34,68],[68,71],[71,73.53],[73.53,75.5],[75.5,78.02]], "step2": [[57.98,63.4],[63.4,68],[68,73.53],[73.53,78.02]], "step3": [[57.98,68],[68,78.02]], "step4": [57.98,78.02] },
  { "p": 5, "text": "poysilaik kuralERReruththam iRuththup * pOraravIrththa kOn * seysilaich chudar sUzhoLith * thiNNa mAmadhiL thennaranganAm * meysilaik karumEgam onRu * tham nenjil ninRu thigazhap pOy * meysilirppavar thammaiyE ninaindhu * en manam mey silirkkumE *", "step1": [[78.02,80.55],[80.55,82.5],[82.5,84.3],[84.3,86.83],[86.83,89.36],[89.36,91.89],[91.89,94.41],[94.41,96.94]], "step2": [[78.02,82.5],[82.5,86.83],[86.83,91.89],[91.89,96.94]], "step3": [[78.02,86.83],[86.83,96.94]], "step4": [78.02,96.94] },
  { "p": 6, "text": "Adhi andham anandham aRpudhamAna * vAnavar tham pirAn * pAdha mAmalar sUdum paththi ilAdha * pAvigaL uyndhida * thIdhil nanneRi kAtti * engum thirindhu arangan emmAnukkE * kAdhal sey thoNdarkku eppiRappilum * kAdhal seyyum en nenjamE *", "step1": [[96.94,100],[100,102],[102,104.7],[104.7,106.73],[106.73,109],[109,111.72],[111.72,114.45],[114.45,116.98]], "step2": [[96.94,102],[102,106.73],[106.73,111.72],[111.72,116.98]], "step3": [[96.94,106.73],[106.73,116.98]], "step4": [96.94,116.98] },
  { "p": 7, "text": "kArinam purai mEni naRkadhir * muththa veNNagaich cheyya vAy * AramArvan arangan ennum * arumperum sudar onRinai * sErum nenjinarAgich * chErndhu kasindhizhindha kaNNIrgaLAl * vAra niRpavar thALiNaikku * oru vAramAgum en nenjamE *", "step1": [[116.98,119.51],[119.51,121.8],[121.8,124],[124,126.53],[126.53,128.2],[128.2,131],[131,133.3],[133.3,135.83]], "step2": [[116.98,121.8],[121.8,126.53],[126.53,131],[131,135.83]], "step3": [[116.98,126.53],[126.53,135.83]], "step4": [116.98,135.83] },
  { "p": 8, "text": "mAlaiyuRRa kadal kidandhavan * vaNdukiNdu naRundhuzhAy * mAlaiyuRRa varaipperum thirumArvanai * malarkkaNNanai * mAlaiyuRRu ezhundhu AdippAdith * thirindhu arangan emmAnukkE * mAlaiyuRRidum thoNdar vAzhvukku * mAlaiyuRRadhu en nenjamE *", "step1": [[135.83,138.06],[138.06,140.2],[140.2,142.73],[142.73,144.5],[144.5,146.8],[146.8,149.33],[149.33,151.95],[151.95,154.48]], "step2": [[135.83,140.2],[140.2,144.5],[144.5,149.33],[149.33,154.48]], "step3": [[135.83,144.5],[144.5,154.48]], "step4": [135.83,154.48] },
  { "p": 9, "text": "moyththuk kaNpani sOra meygaL silirppa * Engi iLaiththu ninRu * eyththuk kumbidu nattam ittezhundhu * AdippAdi iRainji * en aththan achchan aranganukku adiyArgaLAgi * avanukkE piththarAm avar * piththar allargaL * maRRaiyAr muRRum piththarE *", "step1": [[154.48,157.3],[157.3,159.83],[159.83,162.35],[162.35,164.8],[164.8,168.4],[168.4,170.63],[170.63,172],[172,174.53]], "step2": [[154.48,159.83],[159.83,164.8],[164.8,170.63],[170.63,174.53]], "step3": [[154.48,164.8],[164.8,174.53]], "step4": [154.48,174.53] },
  { "p": 10, "text": "alli mAmalar mangai nAdhan * arangan meyyadiyArgaL tham * ellaiyil adimaith thiRaththinil * enRum mEvu manaththanAm * kollikAvalan kUdalnAyagan * kOzhikkOn kulasEkaran * sollin inthamizh mAlai vallavar * thoNdar thoNdargaL AvarE *", "step1": [[174.53,177.06],[177.06,179.59],[179.59,181.5],[181.5,184.03],[184.03,186.56],[186.56,188.6],[188.6,190.7],[190.7,193]], "step2": [[174.53,179.59],[179.59,184.03],[184.03,188.6],[188.6,193]], "step3": [[174.53,184.03],[184.03,193]], "step4": [174.53,193] }
],
'PMT.5.steps' : [
  { "p": 1, "text": "tharuthuyaram thadAyEl * un saraN allAl saraN illai * virai kuzhuvum malarppozhil sUzh * viththuvakkOttammAnE! * arisinaththAl InRa thAy agaRRidinum * maRRavaL than aruL ninaindhE azhum kuzhavi * adhuvE pOnRirundhEnE *", "step1": [[0,2],[2,4.23],[4.23,6.16],[6.16,8.39],[8.39,12],[12,15.11],[15.11,17.27]], "step2": [[0,4.23],[4.23,8.39],[8.39,15.11],[15.11,17.27]], "step3": [[0,8.39],[8.39,17.27]], "step4": [0,17.27] },
  { "p": 2, "text": "kaNdAr igazhvanavE * kAdhalan thAn seydhidinum * koNdAnai allAl * aRiyAk kulamagaL pOl * viNthOy madhiL pudai sUzh * viththuvakkOttammA! * nI koNdALAyAgilum * un kuraikazhalE kURuvanE *", "step1": [[17.27,19.56],[19.56,21.79],[21.79,23.7],[23.7,25.93],[25.93,28],[28,30.04],[30.04,31.84],[31.84,34.07]], "step2": [[17.27,21.79],[21.79,25.93],[25.93,30.04],[30.04,34.07]], "step3": [[17.27,25.93],[25.93,34.07]], "step4": [17.27,34.07] },
  { "p": 3, "text": "mIn nOkkum nILvayal sUzh * viththuvakkOttammA! * en pAl nOkkAyAgilum * un paRRallAl paRRilEn * thAn nOkkAdhu eththuyaram * seydhidinum * thArvEndhan kOl nOkki vAzhum * kudi pOnRirundhEnE *", "step1": [[34.07,36.3],[36.3,38.53],[38.53,40.76],[40.76,42.98],[42.98,45.59],[45.59,46.54],[46.54,49.4],[49.4,51.63]], "step2": [[34.07,38.53],[38.53,42.98],[42.98,46.54],[46.54,51.63]], "step3": [[34.07,42.98],[42.98,51.63]], "step4": [34.07,51.63] },
  { "p": 4, "text": "vALAl aRuththuch chudinum * maruththuvan pAl * mALAdha kAdhal * nOyALan pOl mAyaththAl * mILAth thuyar tharinum * viththuvakkOttammA! * nI ALA unadharuLE * pArppan adiyEnE *", "step1": [[51.63,53.73],[53.73,55.35],[55.35,56.85],[56.85,59.5],[59.5,61.9],[61.9,63.7],[63.7,65.6],[65.6,67.83]], "step2": [[51.63,55.35],[55.35,59.5],[59.5,63.7],[63.7,67.83]], "step3": [[51.63,59.5],[59.5,67.83]], "step4": [51.63,67.83] },
  { "p": 5, "text": "vengaN thiN kaLiRu adarththAy! * viththuvakkOttammAnE! * engup pOy uygEn? * un iNaiyadiyE adaiyal allAl * engum pOyk karai kANAdhu * eRikadal vAy mINdEyum * vangaththin kUmbERum * mAppaRavai pOnREnE *", "step1": [[67.83,70.05],[70.05,72.28],[72.28,74],[74,76.43],[76.43,78.55],[78.55,81.2],[81.2,83.23],[83.23,85.66]], "step2": [[67.83,72.28],[72.28,76.43],[76.43,81.2],[81.2,85.66]], "step3": [[67.83,76.43],[76.43,85.66]], "step4": [67.83,85.66] },
  { "p": 6, "text": "sendhazhalE vandhu * azhalaich cheydhidinum * sengamalam andharam sEr * vengadhirORkallAl alarAvAl * vendhuyar vIttAvidinum * viththuvakkOttammA! * un andhamil sIrkkallAl * agam kuzhaiya mAttEnE *", "step1": [[85.66,87.59],[87.59,89.55],[89.55,91.5],[91.5,94],[94,96.22],[96.22,98],[98,100],[100,102.23]], "step2": [[85.66,89.55],[89.55,94],[94,98],[98,102.23]], "step3": [[85.66,94],[94,102.23]], "step4": [85.66,102.23] },
  { "p": 7, "text": "eththanaiyum vAn maRandha kAlaththum * paingUzhgaL * maiththezhundha mAmugilE * pArththirukkum maRRavai pOl * meyththuyar vIttAvidinum * viththuvakkOttammA! * en siththam miga un pAlE * vaippan Adilene *", "step1": [[102.23,104.46],[104.46,105.96],[105.96,108],[108,110.23],[110.23,112.46],[112.46,114.3],[114.3,116.53],[116.53,118.4]], "step2": [[102.23,105.96],[105.96,110.23],[110.23,114.3],[114.3,118.4]], "step3": [[102.23,110.23],[110.23,118.4]], "step4": [102.23,118.4] },
  { "p": 8, "text": "thokkilanguyARellAm * parandhOdi * thodukadalE pukkanRip puRam niRka * mAttAdha maRRavai pOl * mikkilangu mugilniRaththAy! * viththuvakkOttammA! * un pukkilangu sIrallAl * pukkilan kAN puNNiyanE! *", "step1": [[118.4,120.4],[120.4,121.7],[121.7,124.35],[124.35,126.35],[126.35,128.8],[128.8,130.5],[130.5,132.63],[132.63,134.86]], "step2": [[118.4,121.7],[121.7,126.35],[126.35,130.5],[130.5,134.86]], "step3": [[118.4,126.35],[126.35,134.86]], "step4": [118.4,134.86] },
  { "p": 9, "text": "ninnaiyE thAn vENdi * nILselvam vENdAdhAn thannaiyE * thAn vENdum * selvam pOl mAyaththAl * minnaiyE sEr thigiri * viththuvakkOttammA! * ninnaiyE thAn vENdi * niRpan adiyEnE *", "step1": [[134.86,136.7],[136.7,139.25],[139.25,140.7],[140.7,142.93],[142.93,144.75],[144.75,146.55],[146.55,148.48],[148.48,150.51]], "step2": [[134.86,139.25],[139.25,142.93],[142.93,146.55],[146.55,150.51]], "step3": [[134.86,142.93],[142.93,150.51]], "step4": [134.86,150.51] },
  { "p": 10, "text": "viththuvakkOttammA! * nI vENdAyE Ayidinum * maRRArum paRRillEn enRu * avanaith thAL nayandha * koRRavEl thAnaik * kulasEkaran sonna * naRRamizh paththum vallAr * naNNAr naragamE *", "step1": [[150.51,152.22],[152.22,154.45],[154.45,156.38],[156.38,158.61],[158.61,160.4],[160.4,162.23],[162.23,164.16],[164.16,167]], "step2": [[150.51,154.45],[154.45,158.61],[158.61,162.23],[162.23,167]], "step3": [[150.51,158.61],[158.61,167]], "step4": [150.51,167] }
],
    
'NAT.2.all': [
    {"start": 0, "end":12.75},
        { "start": 114.01, "end": 129.12 }, 
        { "start": 174.39, "end": 189.37 }, 
        { "start": 236.36, "end": 250.16 }, 
        { "start": 294.04, "end": 309.98 }, 
        { "start": 351.57, "end": 366.41 }, 
        { "start": 410.41, "end": 425.02 }, 
        { "start": 469.54, "end": 485 }, 
        { "start": 532, "end": 546.12 }
    ],
    
    // Add new markers here
};

