/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  Clock, 
  PlayCircle, 
  HelpCircle, 
  MessageCircle,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  Star,
  Globe,
  Wallet,
  Coins,
  Headphones,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, LANGUAGES, Language } from './translations';
// @ts-ignore
import appScreenshot from './assets/images/sara_model_hero_1780777999757.png';

// Configuration
const DOWNLOAD_LINK = "https://sara365.fun/Sara365.apk";
const PRIMARY_COLOR = "#EAB308"; // Professional Yellow for Sara 365
const ACCENT_COLOR = "#111827"; // Dark contrast

const LOCAL_EXTRA_TRANSLATIONS: Record<Language, {
  howToStart: string;
  howToStartSub: string;
  step1: string;
  step1Txt: string;
  step2: string;
  step2Txt: string;
  step3: string;
  step3Txt: string;
  recentTx: string;
  depositMsg: string;
  withdrawMsg: string;
  reviewsHeading: string;
  reviewsSub: string;
  review1Text: string;
  review2Text: string;
  review3Text: string;
  review4Text: string;
  verifiedUser: string;
}> = {
  en: {
    howToStart: "Start Winning In Just 3 Actions",
    howToStartSub: "Ready to start? Follow these 3 super fast and secure steps to download and begin playing with instant credits.",
    step1: "1. Download Android App",
    step1Txt: "Unlock maximum speed by installing the secured official Android package APK. Click on 'Download App' to fetch it immediately.",
    step2: "2. Add Secure Deposit (Min ₹100)",
    step2Txt: "No registration hurdles. Use GooglePay, PhonePe, UPI or Paytm to load points. Credit added to your wallet in 10 seconds flat!",
    step3: "3. Start Bidding & Withdraw Live",
    step3Txt: "Place bids on your favorite trusted markets. Win biggest industry multipliers and withdraw automatically to your bank 24/7.",
    recentTx: "Recent Activity",
    depositMsg: "deposited",
    withdrawMsg: "withdrew",
    reviewsHeading: "Trusted By 5,00,000+ Players",
    reviewsSub: "Read authentic feedback from regular players who deposit and withdraw every day.",
    review1Text: "Top-class application! The deposit process takes less than 15 seconds. Just played Mumbai market and withdrew ₹4,500 instantly. Highly recommended!",
    review2Text: "Best matka support in India. I had an issue on UPI and the WhatsApp helpdesk fixed it within 2 minutes. Withdrawal speed is truly auto and 24/7.",
    review3Text: "Minimum budget ₹100 is great for beginners. Very transparent rates. Unlike other apps, they pay full 10 ka 1000 for Single Panna. Best user experience!",
    review4Text: "Downloaded yesterday and already made ₹2,000 profit. Clean and super-fast login. Automatic withdrawal works perfectly in midnight also.",
    verifiedUser: "Verified Player"
  },
  hi: {
    howToStart: "केवल 3 आसान चरणों में खेलना शुरू करें",
    howToStartSub: "तुरंत डाउनलोड करें और खेलना शुरू करें। जमा और निकासी अत्यंत तेज़ और सुरक्षित है।",
    step1: "1. एंड्रॉइड ऐप डाउनलोड करें",
    step1Txt: "सबसे तेज़ स्पीड के लिए सुरक्षित आधिकारिक एंड्रॉइड APK इंस्टॉल करें। 'डाउनलोड ऐप' बटन दबाकर तुरंत प्राप्त करें।",
    step2: "2. सुरक्षित जमा जोड़ें (न्यूनतम ₹100)",
    step2Txt: "बिना किसी झंझट के GooglePay, PhonePe, UPI या Paytm से पैसे जोड़ें। 10 सेकंड में आपके वॉलेट में क्रेडिट सुरक्षित रूप से जुड़ जाएगा!",
    step3: "3. खेलना शुरू करें और लाइव निकासी लें",
    step3Txt: "अपने पसंदीदा लाइव बाज़ारों में खेलें, सर्वोत्तम मुनाफा कमाएं और 24/7 स्वचालित रूप से सीधे अपने बैंक खाते में निकासी प्राप्त करें।",
    recentTx: "हालिया लेनदेन",
    depositMsg: "ने जमा किए",
    withdrawMsg: "ने निकाले",
    reviewsHeading: "5,00,000+ खिलाड़ियों का अटूट विश्वास",
    reviewsSub: "रोजाना खेलने वाले वास्तविक खिलाड़ियों की ईमानदार समीक्षाएं पढ़ें।",
    review1Text: "शानदार एप्लीकेशन! पैसे जमा करने में 15 सेकंड से भी कम समय लगता है। मैंने कल्याण खेला और ₹4,500 की तुरंत निकासी मिल गई। जरूर डाउनलोड करें!",
    review2Text: "भारत का सबसे बेहतरीन हेल्पडेस्क सपोर्ट। व्हाट्सएप टीम ने यूपीआई की समस्या को तुरंत सुधार दिया। पैसे सीधे बैंक में आ जाते हैं वो भी तुरंत।",
    review3Text: "न्यूनतम ₹100 जमा का विकल्प शुरुआती लोगों के लिए बहुत बढ़िया है। रेट्स एकदम पारदर्शी हैं। सिंगल पाना का रेट सबसे ज्यादा ₹1000 है।",
    review4Text: "कल ही ऐप डाउनलोड किया और ₹2,000 का मुनाफा कमा लिया। बहुत ही आसान इंटरफ़ेस है और रात 12 बजे भी तुरंत निकासी हो जाती है।",
    verifiedUser: "सत्यापित खिलाड़ी"
  },
  mr: {
    howToStart: "फक्त ३ सोप्या चरणांमध्ये खेळायला सुरुवात करा",
    howToStartSub: "त्वरित डाउनलोड करा आणि खेळायला सुरुवात करा. पैसे जमा करणे आणि काढणे अत्यंत वेगवान आणि सुरक्षित आहे.",
    step1: "१. अँड्रॉइड ॲप डाउनलोड करा",
    step1Txt: "सुरक्षित अधिकृत अँड्रॉइड APK इंस्टॉल करा. 'अॅप डाउनलोड करा' बटणावर क्लिक करून त्वरित मिळवा.",
    step2: "२. सुरक्षित ठेव जोडा (किमान ₹१००)",
    step2Txt: "GooglePay, PhonePe, UPI किंवा Paytm द्वारे त्वरित पैसे जमा करा. फक्त १० सेकंदात क्रेडिट जोडले जाईल!",
    step3: "३. खेळायला सुरुवात करा आणि त्वरित पैसे काढा",
    step3Txt: "तुमच्या आवडत्या लाइव्ह बाजारात खेळा, उत्तम नफा मिळवा आणि थेट बँक खात्यात त्वरित २४/७ नफा सुरक्षितपणे मिळवा.",
    recentTx: "नुकतेच व्यवहार",
    depositMsg: "ने जमा केले",
    withdrawMsg: "ने काढले",
    reviewsHeading: "५,00,000+ खेळाडूंचा विश्वास",
    reviewsSub: "दररोज खेळणाऱ्या आमच्या अधिकृत ग्राहकांचे खरे अभिप्राय वाचा.",
    review1Text: "खूप भारी ॲप आहे! फक्त १५ सेकंदात डिपॉझิต होते. कल्याण वर जिंकलेले ₹४५०० लगेचच माझ्या बँकेत आले. त्वरित डाउनलोड करा!",
    review2Text: "भारतातील सर्वोत्तम ग्राहक सेवा. व्हॉट्सॲप सपोर्ट अत्यंत तत्पर आहे, २ मिनिटात मदत मिळाली. विथड्रॉल खरंच २४/७ ऑटोमॅटिक आहे.",
    review3Text: "ಕಮೀತ್ ಕಮೀ ₹१०० डिपॉझिट सुरुवातीच्या लोकांसाठी योग्य आहे. कोणतीही लपवलेली फी नाही. इतर ऍप्स पेक्षा सर्वात जास्त गेम रेट्स आहेत.",
    review4Text: "कालच डाऊनलोड केले आणि आज ₹२००० कमावले. अतिशय सोपा व स्वस्त इंटरफेस आहे. रात्री पण त्वरित पैसे बँकेत येतात.",
    verifiedUser: "प्रमाणित खेळाडू"
  },
  te: {
    howToStart: "కేవలం 3 సులಭమైన దశల్లో ప్రారంభించండి",
    howToStartSub: "వెంటనే అనువర్తనాన్ని డౌన్‌లోడ్ చేసుకోండి మరియు తక్షణ క్రెడిట్‌లతో ఆడటం ప్రారంభించండి.",
    step1: "1. ఆండ్రాయిడ్ యాప్ డౌన్‌లోడ్ చేసుకోండి",
    step1Txt: "అತ್ಯಂತ వేగవంతమైన స్పీడ్ కొరకు సురಕ್ಷిత అధికారిక ఆండ్రాయిడ్ APK ని ఇನ್‌స్టాల్ చేసుకోండి. 'డೌన్‌లోడ్ యాప్' క్ಲಿక్ చేసి వెంటనే పొందండి.",
    step2: "2. సురಕ್ಷిత డిపాజిట్ జోడించండి (ಕನಿಷ್ಠ ₹100)",
    step2Txt: "గూగుల్ పే, ఫోన్ పే, UPI లేదా పేటీఎం ఉపయోగించి సురಕ್ಷితంగా ಮತ್ತು 10 సెకన్లలో నిధులను యాడ్ చేసుకోండి.",
    step3: "3. బిడ్డింగ్ ప్రారంభించి విత్‌డ్రా చేసుకోండి",
    step3Txt: "మీకు ఇష్టమైన లైవ్ మార్కెట్లలో ప్లే చేయండి, మీ విజయాలను 24/7 నేరుగా మీ బ్యాంక్ ఖాతాకు తక్షణమే బదిಲೀ చేసుకోండి.",
    recentTx: "ఇటీವಲಿ లాವಾదేవీలు",
    depositMsg: "డిపాజిట్ చేసారు",
    withdrawMsg: "విత్‌డ్రా చేసారు",
    reviewsHeading: "5,00,000+ ఆటగాళ్ల నమ్మకం",
    reviewsSub: "ప్రతిరోజూ ఆడే నిజమైన వినియోగదారుల ఫೀడ్‌బ్యాక్ చూడండి.",
    review1Text: "టాప్ యాప్! డిపాజిట్ కేవలం 15 సెకన్లలో పూర్ತవుతుంది. కళ్యాణ్ మార్కెట్లో గెలిచిన ₹4,500 వెంటనే నా అకౌంట్‌కి వచ్చాయి. ఖచ్చಿತంగా వాడండి!",
    review2Text: "ఇండియాలోనే బెస్ట్ కస్టమర్ సపోర్ట్. నైట్ టైమ్‌లో కూడా నాకు కేవలం 2 నిಮಿಷాల్లో వాట్ಸಾಪ್ ద్వారా మద్దతు లಭించింది. బదిలీలు చాలా ఫాస్ట్.",
    review3Text: "కనీస బడ్జెట్ ₹100 ఉన్నందున అందరూ సులభంగా ప్లే చేయవచ్చు. గేమ్ రేట్లు చాలా పారదర్శకంగా మరియు అత్యధికంగా ఉన్నాయి.",
    review4Text: "నిన్ననే యాప్ డౌన్‌లోడ్ చేసాను, ఈపాಟಿకే ₹2,000 లాభం వచ్చింది. అర్ధరాత్రి లో కూడా తక్షణమే ఆటోమేಟಿక్ విత్ డ్రా అవుతుంది. సూపర్బ్!",
    verifiedUser: "ధృವೀకరించబడిన వ్యక్తి"
  },
  ta: {
    howToStart: "வெறும் 3 எளிய வழிகளில் விளையாடத் தொடங்குங்கள்",
    howToStartSub: "உடனடியாக செயலியை பதிவிறக்கம் செய்து பாதுகாப்பான முறையில் டெபாசிட் செய்து விளையாடத் தொடங்குங்கள்.",
    step1: "1. ஆண்ட்ராய்டு செயலியை பதிவிறக்கவும்",
    step1Txt: "மிகவும் வேகமான அனுபவத்திற்கு அதிகாரப்பூர்வ ஆண்ட்ராய்டு APK நிறுவுங்கள். பதிவிறக்க பொத்தானை அழுத்தவும்.",
    step2: "2. பாதுகாப்பான டெபாசிட் (குறைந்தபட்சம் ₹100)",
    step2Txt: "GooglePay, PhonePe, UPI அல்லது Paytm மூலம் 10 விநாடிகளுக்குள் பாதுகாப்பாக உங்கள் வாலட்டில் பணத்தைச் சேர்க்கலாம்.",
    step3: "3. விளையாடி வெற்றிகளை உடனடியாக பெறவும்",
    step3Txt: "உங்களுக்கு விருப்பமான சந்தைகளில் விளையாடி, உங்கள் கணக்கிற்கு 24/7 தானியங்கி முறையில் பணத்தை திரும்பப் பெறுங்கள்.",
    recentTx: "சமீபத்திய பரிவர்த்தனைகள்",
    depositMsg: "டெபாசிட் செய்தார்",
    withdrawMsg: "திரும்பப் பெற்றார்",
    reviewsHeading: "5,00,000+ வாடிக்கையாளர்களின் நம்பகமான தளம்",
    reviewsSub: "தினமும் விளையாடும் உண்மையான பயனர்களின் நேர்மையான கருத்துக்கள்.",
    review1Text: "அற்புதமான செயலி! பணம் டெபாசிட் செய்ய 15 விநாடிகள் மட்டுமே ஆகிறது. ஸ்ரீதேவி விளையாடி ₹4,500 உடனடியாக எடுத்தேன். சிறந்த அனுபவம்!",
    review2Text: "இந்தியாவின் மிகச்சிறந்த வாட்ஸ்அப் வாடிக்கையாளர் ஆதரவு. எனது கேள்விகளுக்கு 2 நிமிடத்தில் தீர்வு கிடைத்தது. பணம் திரும்பப் பெறுவது மிகவும் விரைவு.",
    review3Text: "குறைந்தபட்ச வைப்புத்தொகை ₹100 மட்டுமே என்பது மிகவும் நல்லது. விலைகள் மிகத் தெளிவாக உள்ளன. சிறந்த மார்க்கெட் ரேட் இதில்தான்.",
    review4Text: "நேற்றுதான் பதிவிறக்கி ₹2,000 லாபம் பெற்றேன். பயன்பாடு மிகவும் எளிமையானது மற்றும் வேகமானது. நள்ளிரவிலும் தடையின்றி இயங்குகிறது.",
    verifiedUser: "உறுதிப்படுத்தப்பட்ட பயனர்"
  },
  kn: {
    howToStart: "ಕೇವಲ 3 ಹಂತಗಳಲ್ಲಿ ಆಟವನ್ನು ಪ್ರಾರಂಭಿಸಿ",
    howToStartSub: "ಸುಲಭವಾಗಿ ಮತ್ತು ವೇಗವಾಗಿ ಆಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ತಕ್ಷಣವೇ ಹಣ ಠೇವಣಿ ಮಾಡಿ ಆಡಲು ಪ್ರಾರಂಭಿಸಿ.",
    step1: "1. ಆಂಡ್ರಾಯ್ಡ್ ಆಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    step1Txt: "ವೇಗದ ಗೇಮಿಂಗ್‌ಗಾಗಿ ಸುರಕ್ಷಿತ ಅಧಿಕೃತ ಆಂಡ್ರಾಯ್ಡ್ APK ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ. 'ಡೌನ್‌ಲೋಡ್ ಆಪ್' ಕ್ಲಿಕ್ ಮಾಡಿ ತಕ್ಷಣ ಪಡೆಯಿರಿ.",
    step2: "2. ಸುರಕ್ಷಿತ ಠೇವಣಿ ಸೇರಿಸಿ (ಕನಿಷ್ಠ ₹100)",
    step2Txt: "GooglePay, PhonePe, UPI ಅಥವಾ Paytm ಮೂಲಕ ಕೇವಲ 10 ಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ ನಿಮ್ಮ ವಾಲೆಟ್‌ಗೆ ಸುರಕ್ಷಿತವಾಗಿ ಹಣ ಸೇರಿಸಿ.",
    step3: "3. ಆಟ ಪ್ರಾರಂಭಿಸಿ ಮತ್ತು ತಕ್ಷಣ ಹಣ ಹಿಂಪಡೆಯಿರಿ",
    step3Txt: "ನಿಮ್ಮ ನೆಚ್ಚಿನ ಲೈವ್ ಮಾರುಕಟ್ಟೆಗಳಲ್ಲಿ ಆಡಿ, ನಿಮ್ಮ ಗೆಲುವನ್ನು 24/7 ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮಾ ಮಾಡಿಕೊಳ್ಳಿ.",
    recentTx: "ಇತ್ತೀಚಿನ ವಹಿವಾಟುಗಳು",
    depositMsg: "ಠೇವಣಿ ಮಾಡಿದ್ದಾರೆ",
    withdrawMsg: "ಹಿಂಪಡೆದಿದ್ದಾರೆ",
    reviewsHeading: "5,00,000+ ಗ್ರಾಹಕರ ಅಪಾರ ನಂಬಿಕೆ",
    reviewsSub: "ಪ್ರತಿಡಿಯಿ ಆಡುವ ನೈಜ ಗ್ರಾಹಕರಿಂದ ಬಂದ ಪ್ರಾಮಾಣಿಕ ಮತ್ತು ನೈಜ ವಿಮರ್ಶೆಗಳು.",
    review1Text: "ಅತ್ಯುತ್ತಮ ಅಪ್ಲಿಕೇಶನ್! ಕೇವಲ 15 ಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ ಹಣ ಜಮೆಯಾಗುತ್ತದೆ. ಕಲ್ಯಾಣ್ ಆಟ ಆಡಿ ಗೆದ್ದ ₹4,500 ಅನ್ನು ತಕ್ಷಣವೇ ಬ್ಯಾಂಕಿಗೆ ಹಿಂಪಡೆದಿದ್ದೇನೆ. ಸೂಪರ್ ಅನುಭವ!",
    review2Text: "ಭಾರತದ ನಂಬರ್ 1 ಗ್ರಾಹಕ ಸೇವೆ. ವಾಟ್ಸಾಪ್ ಸಪೋರ್ಟ್ ಅದ್ಭುತವಾಗಿದ್ದು, 2 ನಿಮಿಷಗಳಲ್ಲಿ ಸಮಸ್ಯೆ ಪರಿಹಾರವಾಯಿತು. ನಿಜಕ್ಕೂ 24/7 ಆಟೋಮ್ಯಾಟಿಕ್ ಹಿಂಪಡೆಯುವಿಕೆ ಇದೆ.",
    review3Text: "ಕನಿಷ್ಠ ₹100 ಬಳಸಲು ಅವಕಾಶ ಇರುವುದು ಆರಂಭಿಕರಿಗೆ ವರದಾನ. ಗೇಮ್ ದರಗಳು ಮಾರುಕಟ್ಟೆಯಲ್ಲೇ ಅತ್ಯುತ್ತಮವಾಗಿವೆ ಮತ್ತು ತುಂಬಾ ಪಾರದರ್ಶಕವಾಗಿವೆ.",
    review4Text: "ನಿನ್ನೆ ತಾನೆ ಡೌನ್ಲೋಡ್ ಮಾಡಿದ್ದು ಈಗಾಗಲೆ ₹2,000 ನಷ್ಟವಿಲ್ಲದೆ ಸಂಪಾದಿಸಿದ್ದೇನೆ. ಅತ್ಯಂತ ವೇಗವಾದ ಇಂಟರ್ಫೇಸ್ ಮತ್ತು ಮಧ್ಯರಾತ್ರಿಯಲ್ಲೂ ವಿತ್ ಡ್ರಾ ಆಗುತ್ತದೆ.",
    verifiedUser: "ದೃಢೀಕೃತ ಆಟಗಾರ"
  }
};

const RECENT_TRANSACTIONS = [
  { id: 1, name: "Amit Kumar", isDeposit: true, amount: 500, time: "Just now", city: "Patna", color: "bg-blue-500" },
  { id: 2, name: "Sanjeev Sharma", isDeposit: false, amount: 2500, time: "1 min ago", city: "Jaipur", color: "bg-indigo-500" },
  { id: 3, name: "Vijay K.", isDeposit: true, amount: 1000, time: "Just now", city: "Nagpur", color: "bg-emerald-500" },
  { id: 4, name: "Priya S.", isDeposit: true, amount: 200, time: "2 min ago", city: "Indore", color: "bg-purple-500" },
  { id: 5, name: "Rahul Deshmukh", isDeposit: false, amount: 6200, time: "Just now", city: "Pune", color: "bg-orange-500" },
  { id: 6, name: "Ramesh Babu", isDeposit: true, amount: 5000, time: "Just now", city: "Hyderabad", color: "bg-rose-500" },
  { id: 7, name: "Sumit Yadav", isDeposit: true, amount: 1500, time: "3 min ago", city: "Gwalior", color: "bg-cyan-500" },
  { id: 8, name: "Chandra Shekhar", isDeposit: false, amount: 4500, time: "Just now", city: "Chennai", color: "bg-amber-500" },
  { id: 9, name: "Gaurav Sharma", isDeposit: true, amount: 300, time: "Just now", city: "Sikar", color: "bg-teal-500" },
  { id: 10, name: "Deepak Choudhary", isDeposit: false, amount: 1200, time: "2 min ago", city: "Ahmedabad", color: "bg-violet-500" },
  { id: 11, name: "Kiran Gowda", isDeposit: true, amount: 100, time: "Just now", city: "Mysuru", color: "bg-pink-500" },
  { id: 12, name: "Satish Kumar", isDeposit: false, amount: 8000, time: "Just now", city: "Ranchi", color: "bg-fuchsia-500" },
];

interface Market {
  id: string;
  name: string;
  openTime: string;
  closeTime: string;
  result: string;
  isOpen: boolean;
}

const MARKETS: Market[] = [
  { id: '1', name: 'SRI DEVI', openTime: '09:30 AM', closeTime: '10:30 AM', result: '123-45-678', isOpen: false },
  { id: '2', name: 'TIME BAZAR', openTime: '01:00 PM', closeTime: '02:00 PM', result: '456-78-901', isOpen: true },
  { id: '3', name: 'MILAN DAY', openTime: '03:00 PM', closeTime: '05:00 PM', result: '789-01-234', isOpen: true },
  { id: '4', name: 'KALYAN', openTime: '04:00 PM', closeTime: '06:10 PM', result: '234-56-789', isOpen: true },
  { id: '5', name: 'MILAN NIGHT', openTime: '09:00 PM', closeTime: '11:00 PM', result: '345-67-890', isOpen: false },
  { id: '6', name: 'RAJDHANI NIGHT', openTime: '09:30 PM', closeTime: '11:45 PM', result: '567-89-012', isOpen: false },
  { id: '7', name: 'MAIN BAZAR', openTime: '09:45 PM', closeTime: '12:05 AM', result: '678-90-123', isOpen: false },
  { id: '8', name: 'SRI DEVI NIGHT', openTime: '07:00 PM', closeTime: '08:00 PM', result: '890-12-345', isOpen: false },
];

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('lang') as Language) || 'en';
  });
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const [currentToast, setCurrentToast] = useState<typeof RECENT_TRANSACTIONS[0] | null>(null);

  useEffect(() => {
    // Start showing popups shortly after loading
    const initialTimeout = setTimeout(() => {
      setCurrentToast(RECENT_TRANSACTIONS[0]);
    }, 2500);

    const interval = setInterval(() => {
      setCurrentToast(null); // Hide current toast first for exit transition
      
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * RECENT_TRANSACTIONS.length);
        setCurrentToast(RECENT_TRANSACTIONS[randomIndex]);
      }, 1000); // wait 1s then show next

    }, 7000); // run every 7 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const handleDownload = () => {
    window.open(DOWNLOAD_LINK, '_blank');
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    setIsLangDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const t = translations[lang];
  const ex = LOCAL_EXTRA_TRANSLATIONS[lang] || LOCAL_EXTRA_TRANSLATIONS.en;
  const activeLangOption = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-yellow-100 selection:text-yellow-900">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[#EAB308]">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
            <div className="w-10 h-10 bg-[#EAB308] rounded-xl flex items-center justify-center text-white shadow-lg shadow-yellow-200">
               S
            </div>
            <span>SARA<span className="text-gray-400">365</span></span>
          </div>

          <div className="hidden md:flex items-center gap-6 font-medium italic">
            <a href="#" className="hover:text-yellow-700 transition-colors not-italic">{t.navHome}</a>
            <a href="#markets" className="hover:text-yellow-700 transition-colors not-italic">{t.navMarkets}</a>
            <a href="#features" className="hover:text-yellow-700 transition-colors not-italic">{t.navFeatures}</a>
            
            {/* Premium Language Dropdown */}
            <div className="relative not-italic font-sans" ref={langDropdownRef}>
              <button 
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50/50 transition-all text-gray-700 text-sm font-semibold cursor-pointer"
              >
                <Globe size={16} className="text-gray-500" />
                <span>{activeLangOption.name}</span>
              </button>
              
              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50"
                  >
                    {LANGUAGES.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => handleLanguageChange(item.code)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-yellow-50 hover:text-yellow-700 font-semibold flex items-center justify-between cursor-pointer ${lang === item.code ? 'text-yellow-600 bg-yellow-50/50' : 'text-gray-700'}`}
                      >
                        {item.name}
                        {lang === item.code && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={handleDownload}
              className="bg-[#EAB308] text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-yellow-100 hover:scale-105 active:scale-95 transition-all cursor-pointer not-italic"
            >
              {t.downloadApp}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-3">
            {/* Mobile Language Picker Selector */}
            <div className="relative" ref={langDropdownRef}>
              <button 
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold bg-white cursor-pointer"
              >
                <Globe size={14} className="text-gray-500" />
                <span>{activeLangOption.name}</span>
              </button>
              
              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-50"
                  >
                    {LANGUAGES.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => handleLanguageChange(item.code)}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-gray-700 hover:bg-yellow-50"
                      >
                        {item.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-[#EAB308]">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-xl font-bold text-[#EAB308]">
              <a href="#" onClick={() => setIsMenuOpen(false)}>{t.navHome}</a>
              <a href="#markets" onClick={() => setIsMenuOpen(false)}>{t.navMarkets}</a>
              <a href="#features" onClick={() => setIsMenuOpen(false)}>{t.navFeatures}</a>
              <button 
                onClick={(e) => { setIsMenuOpen(false); handleDownload(); }}
                className="bg-[#EAB308] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold cursor-pointer"
              >
                <Download size={20} /> {t.downloadApp}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-10">
          <div className="absolute top-20 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-yellow-50 text-[#EAB308] px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-yellow-100">
              <Star size={16} fill="currentColor" />
              {t.tagline}
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-[1.15] mb-6 tracking-tight">
              {t.heroHeading}<span className="text-[#EAB308] block md:inline">{t.heroHeadingAccent}</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">
              {t.heroSubheading}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleDownload}
                className="bg-[#EAB308] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-yellow-200 flex items-center justify-center gap-3 hover:bg-yellow-600 hover:-translate-y-1 transition-all group cursor-pointer animate-pulse"
              >
                <Download size={24} className="group-hover:bounce" />
                {t.downloadAppNow}
              </button>
              <a href="#markets" className="border-2 border-gray-100 bg-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all font-sans">
                <PlayCircle size={24} />
                {t.viewMarkets}
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 w-full max-w-[460px] mx-auto overflow-hidden rounded-[2rem] border-4 border-[#EAB308] shadow-[0_20px_50px_rgba(234,179,8,0.25)] bg-white aspect-[4/5]">
              {/* Promotion illustration */}
              <img 
                src={appScreenshot} 
                alt="Sara 365 Beautiful App Model" 
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating elements for visual interest */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase">{t.todaysProfit}</div>
                  <div className="text-sm font-black">+₹89,400</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Transaction Limits & 24/7 Live Support Section */}
      <section className="py-12 px-6 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-[#111827] rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border-4 border-[#EAB308]"
          >
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -z-10" />

            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight flex items-center justify-center gap-3">
                <span className="w-2.5 h-10 bg-[#EAB308] rounded-full inline-block animate-pulse" />
                {t.infoHeading}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Min Deposit */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, translateY: -4 }}
                className="bg-gray-800/80 border border-gray-700/60 rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/15 transition-all duration-300" />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-400/10 text-[#EAB308] rounded-2xl flex items-center justify-center border border-yellow-400/20">
                    <Coins size={24} />
                  </div>
                  <span className="text-[10px] bg-yellow-400/10 text-yellow-400 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    FAST INFLOW
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-400 text-xs font-black uppercase tracking-wider mb-1">{t.minDepositTitle}</h3>
                  <p className="text-white text-3xl font-black tracking-tight">{t.minDepositValue}</p>
                </div>
              </motion.div>

              {/* Card 2: Min Withdrawal */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.03, translateY: -4 }}
                className="bg-gray-800/80 border border-gray-700/60 rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/15 transition-all duration-300" />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-400/10 text-[#EAB308] rounded-2xl flex items-center justify-center border border-yellow-400/20">
                    <Wallet size={24} />
                  </div>
                  <span className="text-[10px] bg-yellow-400/10 text-yellow-400 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    GUARANTEED
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-400 text-xs font-black uppercase tracking-wider mb-1">{t.minWithdrawalTitle}</h3>
                  <p className="text-white text-3xl font-black tracking-tight">{t.minWithdrawalValue}</p>
                </div>
              </motion.div>

              {/* Card 3: 24/7 Withdrawal */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.03, translateY: -4 }}
                className="bg-gray-800/80 border border-gray-700/60 rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/15 transition-all duration-300" />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-400/10 text-[#EAB308] rounded-2xl flex items-center justify-center border border-yellow-400/20">
                    <Clock size={24} />
                  </div>
                  <span className="text-[10px] bg-green-400/10 text-green-400 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    24/7 ACTIVE
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-400 text-xs font-black uppercase tracking-wider mb-1">{t.withdrawalTimeTitle}</h3>
                  <p className="text-[#EAB308] text-xl font-black tracking-tight">{t.withdrawalTimeValue}</p>
                </div>
              </motion.div>

              {/* Card 4: 24/7 Customer Service */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.03, translateY: -4 }}
                className="bg-gray-800/80 border border-gray-700/60 rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/15 transition-all duration-300" />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-400/10 text-[#EAB308] rounded-2xl flex items-center justify-center border border-yellow-400/20">
                    <Headphones size={24} />
                  </div>
                  <span className="text-[10px] bg-yellow-400/10 text-yellow-400 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    SUPPORT 24/7
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-400 text-xs font-black uppercase tracking-wider mb-1">{t.customerSupportTitle}</h3>
                  <p className="text-white text-xl font-black tracking-tight">{t.customerSupportValue}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3-Step Start and Instant Deposit Action Guide */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50/50 to-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-extrabold uppercase bg-yellow-101 text-[#EAB308] bg-yellow-100 px-4 py-1.5 rounded-full tracking-wider mb-4 inline-block">
              ⚡ LIVE ONBOARDING
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
              {ex.howToStart}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium text-base leading-relaxed">
              {ex.howToStartSub}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/40 relative group flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-yellow-100 text-[#EAB308] rounded-3xl flex items-center justify-center mb-6 font-black text-xl shadow-md">
                  01
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-[#EAB308] transition-colors">
                  {ex.step1}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-6">
                  {ex.step1Txt}
                </p>
              </div>
              <button 
                onClick={handleDownload}
                className="w-full bg-[#EAB308] text-white py-3 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-600 transition-all shadow-md cursor-pointer"
              >
                <Download size={18} />
                {t.downloadAppNow}
              </button>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#111827] text-white p-8 rounded-[2.5rem] border-4 border-[#EAB308] shadow-2xl relative group flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-[#EAB308] text-[#111827] rounded-3xl flex items-center justify-center mb-6 font-black text-xl shadow-lg">
                  02
                </div>
                <h3 className="text-2xl font-black text-white mb-4">
                  {ex.step2}
                </h3>
                <p className="text-gray-300 font-medium leading-relaxed mb-6">
                  {ex.step2Txt}
                </p>
              </div>
              <div>
                <div className="flex justify-center items-center gap-4 bg-gray-800/80 p-3.5 rounded-2xl border border-gray-700/50">
                  <span className="text-[10px] uppercase font-black tracking-widest bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md animate-pulse">
                    INSTANT CREDIT
                  </span>
                  <span className="text-xs font-bold text-gray-300">GooglePay / PhonePe / Paytm / UPI</span>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/40 relative group flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-yellow-101 bg-yellow-100 text-[#EAB308] rounded-3xl flex items-center justify-center mb-6 font-black text-xl shadow-md">
                  03
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-[#EAB308] transition-colors">
                  {ex.step3}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-6">
                  {ex.step3Txt}
                </p>
              </div>
              <a 
                href="#markets"
                className="w-full border-2 border-gray-200 text-gray-700 hover:border-[#EAB308] hover:text-[#EAB308] py-3 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
              >
                <PlayCircle size={18} />
                {t.viewMarkets}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Notification */}
      <div className="bg-[#EAB308] py-3 text-white font-bold overflow-hidden border-y border-white/10 mt-10">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="mx-10 flex items-center gap-4">
              <Zap size={18} fill="currentColor" />
              {t.marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* Markets Section */}
      <section id="markets" className="py-24 px-6 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-4">{t.liveMarketResults}</h2>
              <p className="text-gray-500 font-medium">{t.marketSubheading}</p>
            </div>
            <div className="flex gap-2">
              <div className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-bold flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {t.liveNow}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MARKETS.map((market, idx) => (
              <motion.div 
                key={market.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-yellow-900/5 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="font-black text-xl tracking-tight group-hover:text-[#EAB308] transition-colors font-sans">
                    {market.name}
                  </div>
                  <div className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${market.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {market.isOpen ? t.open : t.closed}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl py-6 mb-6">
                  <div className="text-[#EAB308] font-black text-3xl tracking-widest font-mono">
                    {market.result}
                  </div>
                  <div className="text-xs font-bold text-gray-400 mt-2 uppercase">{t.prevResult}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase">{t.marketOpen}</span>
                    <span className="text-sm font-bold flex items-center gap-1 font-mono">
                      <Clock size={12} /> {market.openTime}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase">{t.marketClose}</span>
                    <span className="text-sm font-bold flex items-center gap-1 font-mono">
                      <Clock size={12} /> {market.closeTime}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={handleDownload}
                  className="w-full bg-[#EAB308] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-600 transition-all shadow-md shadow-yellow-100 group-hover:scale-[1.02] cursor-pointer"
                >
                  <PlayCircle size={18} /> {t.playNow}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Rates Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl md:text-5xl font-black mb-8">{t.unbeatableRates}</h2>
              <div className="grid gap-4">
                {[
                  { name: t.singleDigit, rate: "10 ka 95" },
                  { name: t.jodiDigit, rate: "10 ka 950" },
                  { name: t.singlePanna, rate: "10 ka 1500" },
                  { name: t.doublePanna, rate: "10 ka 3000" },
                  { name: t.triplePanna, rate: "10 ka 7000" },
                  { name: t.halfSangam, rate: "10 ka 10000" },
                  { name: t.fullSangam, rate: "10 ka 100000" },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 border border-gray-100 font-bold group hover:border-[#EAB308] hover:bg-yellow-50 transition-all"
                  >
                    <span className="text-gray-600 group-hover:text-[#EAB308]">{item.name}</span>
                    <span className="bg-[#EAB308] text-white px-4 py-1 rounded-full text-sm font-mono">{item.rate}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="aspect-square bg-yellow-100 rounded-[3rem] overflow-hidden relative">
                <img 
                  src="https://picsum.photos/seed/sara365-rates-yellow/800/800" 
                  alt="Win Big" 
                  className="w-full h-full object-cover mix-blend-overlay opacity-30"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-20 h-20 bg-[#EAB308] rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl">
                    <Star size={40} fill="currentColor" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-[#EAB308] mb-4">{t.highestPayouts}</h3>
                  <p className="text-yellow-900/60 font-bold max-w-sm">{t.payoutsSubheading}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-6">{t.whyChooseUs}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium">{t.whyChooseUsSubheading}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:-translate-y-2 transition-all"
            >
              <div className="w-16 h-16 bg-yellow-100 text-[#EAB308] rounded-2xl flex items-center justify-center mb-8">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4">{t.secureTitle}</h3>
              <p className="text-gray-500 leading-relaxed font-semibold">{t.secureDesc}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-10 bg-[#EAB308] text-white rounded-[2.5rem] shadow-2xl shadow-yellow-200 hover:-translate-y-2 transition-all"
            >
              <div className="w-16 h-16 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-8">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4">{t.payoutsTitle}</h3>
              <p className="text-white/80 leading-relaxed font-semibold">{t.payoutsDesc}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:-translate-y-2 transition-all"
            >
              <div className="w-16 h-16 bg-yellow-100 text-[#EAB308] rounded-2xl flex items-center justify-center mb-8">
                <Smartphone size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4">{t.fastInterfaceTitle}</h3>
              <p className="text-gray-500 leading-relaxed font-semibold">{t.fastInterfaceDesc}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 px-6 bg-gray-50 border-t border-gray-100 relative overflow-hidden">
        {/* Background decorative grids */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-200/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-200/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-extrabold uppercase bg-yellow-200 text-yellow-800 px-4 py-1.5 rounded-full tracking-wider mb-4 inline-block">
              ⭐️ 5.0 GOOGLE PLAY RATING
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
              {ex.reviewsHeading}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium text-base">
              {ex.reviewsSub}
            </p>
          </motion.div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Review 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#EAB308] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 font-semibold leading-relaxed mb-6 italic text-sm">
                  "{ex.review1Text}"
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                <div className="w-12 h-12 bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-black shadow-md font-mono">
                  V
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-sm">Vikram Singh</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-bold mt-1 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                    <span>Jaipur, RJ</span>
                    <span>•</span>
                    <span className="text-green-600">{ex.verifiedUser}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Review 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#EAB308] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 font-semibold leading-relaxed mb-6 italic text-sm">
                  "{ex.review2Text}"
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                <div className="w-12 h-12 bg-gradient-to-tr from-blue-400 to-[#EAB308] rounded-full flex items-center justify-center text-white font-black shadow-md font-mono">
                  R
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-sm">Rajesh Kumar</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-bold mt-1 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                    <span>Pune, MH</span>
                    <span>•</span>
                    <span className="text-green-600">{ex.verifiedUser}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Review 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#EAB308] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 font-semibold leading-relaxed mb-6 italic text-sm">
                  "{ex.review3Text}"
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                <div className="w-12 h-12 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-black shadow-md font-mono">
                  A
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-sm">Amit S.</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-bold mt-1 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                    <span>Indore, MP</span>
                    <span>•</span>
                    <span className="text-green-600">{ex.verifiedUser}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Review 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#EAB308] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 font-semibold leading-relaxed mb-6 italic text-sm">
                  "{ex.review4Text}"
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                <div className="w-12 h-12 bg-gradient-to-tr from-purple-400 to-fuchsia-600 rounded-full flex items-center justify-center text-white font-black shadow-md font-mono">
                  G
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-sm">Gaurav Sharma</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-bold mt-1 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                    <span>Sikar, RJ</span>
                    <span>•</span>
                    <span className="text-green-600">{ex.verifiedUser}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20 px-6 font-sans">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter mb-6">
              <div className="w-10 h-10 bg-[#EAB308] rounded-xl flex items-center justify-center text-white">
                S
              </div>
              <span>SARA<span className="text-gray-500">365</span></span>
            </div>
            <p className="text-gray-400 max-w-sm mb-8 font-semibold leading-relaxed">
              {t.footerTagline}
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#EAB308] cursor-pointer transition-all">
                <MessageCircle size={20} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#EAB308] cursor-pointer transition-all">
                <HelpCircle size={20} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-black text-lg mb-6">{t.quickLinks}</h4>
            <ul className="flex flex-col gap-4 text-gray-400 font-semibold text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{t.howToPlay}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.charts}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.privacy}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.terms}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-lg mb-6">{t.support}</h4>
            <ul className="flex flex-col gap-4 text-gray-400 font-semibold text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{t.contactUs}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.faq}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.whatsapp}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.telegram}</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 text-center text-gray-500 text-sm font-semibold">
          © {new Date().getFullYear()} SARA 365. {t.rightsReserved}
        </div>
      </footer>

      {/* Live Recent Transactions Toast Notifier */}
      <AnimatePresence>
        {currentToast && (
          <motion.div
            initial={{ opacity: 0, x: -100, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.8, transition: { duration: 0.2 } }}
            className="fixed bottom-24 left-6 md:bottom-28 md:left-8 z-[100] max-w-sm bg-[#111827] text-white p-4 rounded-3xl border-2 border-[#EAB308] shadow-2xl flex items-center gap-4 cursor-pointer"
            onClick={handleDownload}
          >
            {/* Pulsing indicator & Avatar */}
            <div className="relative flex-shrink-0">
              <div className={`w-12 h-12 rounded-2xl ${currentToast.color} text-white font-black text-lg flex items-center justify-center shadow-inner`}>
                {currentToast.name.charAt(0)}
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#111827] animate-pulse" />
            </div>

            {/* Notification content */}
            <div className="flex-grow">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <span>{ex.recentTx}</span>
                <span>•</span>
                <span className="text-[#EAB308]">{currentToast.time}</span>
              </div>
              <p className="text-sm font-bold text-white mt-1 leading-snug">
                <span className="font-black text-[#EAB308]">{currentToast.name} </span>
                <span className="text-gray-300 font-semibold text-xs">({currentToast.city}) </span>
                <span className={currentToast.isDeposit ? "text-emerald-400 font-black" : "text-amber-400 font-black"}>
                  {currentToast.isDeposit ? ex.depositMsg : ex.withdrawMsg} 
                </span>
                <span className="font-extrabold text-white"> ₹{currentToast.amount.toLocaleString('en-IN')}!</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Download Button */}
      <motion.button 
        onClick={handleDownload}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[100] bg-[#EAB308] text-white p-4 md:p-5 rounded-full shadow-2xl flex items-center gap-3 overflow-hidden group shadow-yellow-500/40 cursor-pointer border-none outline-none"
      >
        <Download size={24} className="relative z-10" />
        <span className="hidden md:block font-black text-sm relative z-10 whitespace-nowrap">{t.downloadApp}</span>
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </motion.button>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      ` }} />
    </div>
  );
};

export default App;
