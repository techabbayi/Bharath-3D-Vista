'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'te' | 'ta' | 'kn';

export const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' }
];

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
    en: {
        'nav.home': 'Home',
        'nav.discover': 'Discover',
        'nav.virtualTours': 'Virtual Tours',
        'nav.states': 'States',
        'nav.history': 'History',
        'nav.contribute': 'Contribute',
        'nav.about': 'About Us',
        'nav.contact': 'Contact',
        'footer.tagline': 'Bringing India\'s magnificent architectural heritage to life through immersive 3D narratives and virtual reality experiences.',
        'footer.regionalWonders': 'Regional Wonders',
        'footer.navigation': 'Navigation',
        'footer.heritagePolicy': 'Heritage Policy',
        'footer.privacyPolicy': 'Privacy Policy',
        'footer.termsAndConditions': 'Terms and Conditions',
        'footer.credits': 'Credits',
        'footer.copyright': 'Made in Bharat 🇮🇳 | Digitally Preserving India\'s Heritage | Make in India Initiative',
        'footer.developedBy': 'Designed & Developed by',
        'footer.preserving': 'Preserving the past for the future',
        'footer.status': 'Status',
        'footer.allSystemsOperational': 'All Systems Operational',
        'footer.language': 'Language',
        'hero.title': 'BHARAT VISTA',
        'hero.subtitle': '3D Heritage Platform',
        'coming-soon.title': 'Coming Soon',
        'coming-soon.subtitle': 'We are crafting something extraordinary',
    },
    hi: {
        'nav.home': 'मुख्य पृष्ठ',
        'nav.discover': 'खोजें',
        'nav.virtualTours': 'वर्चुअल टूर',
        'nav.states': 'राज्य',
        'nav.history': 'इतिहास',
        'nav.contribute': 'योगदान करें',
        'nav.about': 'हमारे बारे में',
        'nav.contact': 'संपर्क करें',
        'footer.tagline': 'भारत की शानदार स्थापत्य विरासत को 3D और आभासी वास्तविकता के माध्यम से जीवंत करना।',
        'footer.regionalWonders': 'क्षेत्रीय चमत्कार',
        'footer.navigation': 'नेविगेशन',
        'footer.heritagePolicy': 'विरासत नीति',
        'footer.privacyPolicy': 'गोपनीयता नीति',
        'footer.termsAndConditions': 'नियम और शर्तें',
        'footer.credits': 'श्रेय',
        'footer.copyright': 'मेड इन भारत 🇮🇳 | भारत की विरासत का डिजिटल संरक्षण | मेक इन इंडिया पहल',
        'footer.developedBy': 'डिज़ाइन और विकास',
        'footer.preserving': 'भविष्य के लिए अतीत का संरक्षण',
        'footer.status': 'स्थिति',
        'footer.allSystemsOperational': 'सभी सिस्टम चालू हैं',
        'footer.language': 'भाषा',
        'hero.title': 'भारत विस्टा',
        'hero.subtitle': '3D विरासत मंच',
        'coming-soon.title': 'जल्द आ रहा है',
        'coming-soon.subtitle': 'हम कुछ असाधारण तैयार कर रहे हैं',
    },
    te: {
        'nav.home': 'హోమ్',
        'nav.discover': 'కనుగొనండి',
        'nav.virtualTours': 'వర్చువల్ టూర్స్',
        'nav.states': 'రాష్ట్రాలు',
        'nav.history': 'చరిత్ర',
        'nav.contribute': 'సహకరించండి',
        'nav.about': 'మా గురించి',
        'nav.contact': 'సంప్రదించండి',
        'footer.tagline': 'భారతదేశ అద్భుతమైన వాస్తు శిల్ప వారసత్వాన్ని 3D మరియు వర్చువల్ రియాలిటీ ద్వారా సజీవంగా చేస్తోంది.',
        'footer.regionalWonders': 'ప్రాంతీయ అద్భుతాలు',
        'footer.navigation': 'నావిగేషన్',
        'footer.heritagePolicy': 'వారసత్వ విధానం',
        'footer.privacyPolicy': 'గోప్యతా విధానం',
        'footer.termsAndConditions': 'నియమాలు మరియు షరతులు',
        'footer.credits': 'క్రెడిట్స్',
        'footer.copyright': 'మేడ్ ఇన్ భారత్ 🇮🇳 | భారత వారసత్వాన్ని డిజిటల్‌గా సంరక్షించడం | మేక్ ఇన్ ఇండియా కార్యక్రమం',
        'footer.developedBy': 'రూపకల్పన మరియు అభివృద్ధి',
        'footer.preserving': 'భవిష్యత్తు కోసం గతాన్ని పరిరక్షించడం',
        'footer.status': 'స్థితి',
        'footer.allSystemsOperational': 'అన్ని సిస్టమ్‌లు పని చేస్తున్నాయి',
        'footer.language': 'భాష',
        'hero.title': 'భారత్ విస్టా',
        'hero.subtitle': '3D వారసత్వ వేదిక',
        'coming-soon.title': 'త్వరలో వస్తోంది',
        'coming-soon.subtitle': 'మేము అసాధారణమైన దాన్ని రూపొందిస్తున్నాము',
    },
    ta: {
        'nav.home': 'முகப்பு',
        'nav.discover': 'கண்டுபிடி',
        'nav.virtualTours': 'மெய்நிகர் சுற்றுலா',
        'nav.states': 'மாநிலங்கள்',
        'nav.history': 'வரலாறு',
        'nav.contribute': 'பங்களிக்கவும்',
        'nav.about': 'எங்களை பற்றி',
        'nav.contact': 'தொடர்பு',
        'footer.tagline': 'இந்தியாவின் அற்புதமான கட்டடக்கலை பாரம்பரியத்தை 3D மற்றும் மெய்நிகர் உண்மையின் மூலம் உயிர்ப்பிக்கிறது.',
        'footer.regionalWonders': 'பிராந்திய அதிசயங்கள்',
        'footer.navigation': 'வழிசெலுத்தல்',
        'footer.heritagePolicy': 'பாரம்பரிய கொள்கை',
        'footer.privacyPolicy': 'தனியுரிமை கொள்கை',
        'footer.termsAndConditions': 'விதிமுறைகள் மற்றும் நிபந்தனைகள்',
        'footer.credits': 'நன்றிகள்',
        'footer.copyright': 'மேட் இன் பாரத் 🇮🇳 | இந்தியாவின் பாரம்பரியத்தை டிஜிட்டல் பாதுகாத்தல் | மேக் இன் இந்தியா திட்டம்',
        'footer.developedBy': 'வடிவமைப்பு மற்றும் மேம்பாடு',
        'footer.preserving': 'எதிர்காலத்திற்கான கடந்த காலத்தை பாதுகாத்தல்',
        'footer.status': 'நிலை',
        'footer.allSystemsOperational': 'அனைத்து அமைப்புகளும் செயல்படுகின்றன',
        'footer.language': 'மொழி',
        'hero.title': 'பாரத் விஸ்டா',
        'hero.subtitle': '3D பாரம்பரிய தளம்',
        'coming-soon.title': 'விரைவில் வருகிறது',
        'coming-soon.subtitle': 'நாங்கள் அசாதாரணமான ஒன்றை உருவாக்குகிறோம்',
    },
    kn: {
        'nav.home': 'ಮುಖಪುಟ',
        'nav.discover': 'ಅನ್ವೇಷಿಸಿ',
        'nav.virtualTours': 'ವರ್ಚುವಲ್ ಟೂರ್‌ಗಳು',
        'nav.states': 'ರಾಜ್ಯಗಳು',
        'nav.history': 'ಇತಿಹಾಸ',
        'nav.contribute': 'ಕೊಡುಗೆ',
        'nav.about': 'ನಮ್ಮ ಬಗ್ಗೆ',
        'nav.contact': 'ಸಂಪರ್ಕಿಸಿ',
        'footer.tagline': 'ಭಾರತದ ಅದ್ಭುತ ವಾಸ್ತುಶಿಲ್ಪ ಪರಂಪರೆಯನ್ನು 3D ಮತ್ತು ವರ್ಚುವಲ್ ರಿಯಾಲಿಟಿ ಮೂಲಕ ಜೀವಂತಗೊಳಿಸುವುದು.',
        'footer.regionalWonders': 'ಪ್ರಾದೇಶಿಕ ಅದ್ಭುತಗಳು',
        'footer.navigation': 'ನ್ಯಾವಿಗೇಶನ್',
        'footer.heritagePolicy': 'ಪರಂಪರೆ ನೀತಿ',
        'footer.privacyPolicy': 'ಗೌಪ್ಯತಾ ನೀತಿ',
        'footer.termsAndConditions': 'ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು',
        'footer.credits': 'ಕ್ರೆಡಿಟ್‌ಗಳು',
        'footer.copyright': 'ಮೇಡ್ ಇನ್ ಭಾರತ್ 🇮🇳 | ಭಾರತದ ಪರಂಪರೆಯನ್ನು ಡಿಜಿಟಲ್ ಸಂರಕ್ಷಿಸುವುದು | ಮೇಕ್ ಇನ್ ಇಂಡಿಯಾ ಪರಿಕಲ್ಪನೆ',
        'footer.developedBy': 'ವಿನ್ಯಾಸ ಮತ್ತು ಅಭಿವೃದ್ಧಿ',
        'footer.preserving': 'ಭವಿಷ್ಯಕ್ಕಾಗಿ ಭೂತಕಾಲವನ್ನು ಸಂರಕ್ಷಿಸುವುದು',
        'footer.status': 'ಸ್ಥಿತಿ',
        'footer.allSystemsOperational': 'ಎಲ್ಲಾ ವ್ಯವಸ್ಥೆಗಳು ಕಾರ್ಯನಿರತವಾಗಿವೆ',
        'footer.language': 'ಭಾಷೆ',
        'hero.title': 'ಭಾರತ್ ವಿಸ್ಟಾ',
        'hero.subtitle': '3D ಪರಂಪರೆ ವೇದಿಕೆ',
        'coming-soon.title': 'ಶೀಘ್ರದಲ್ಲಿ ಬರಲಿದೆ',
        'coming-soon.subtitle': 'ನಾವು ಅಸಾಧಾರಣವಾದದನ್ನು ರಚಿಸುತ್ತಿದ್ದೇವೆ',
    }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    // Initialize from sessionStorage immediately
    const getInitialLanguage = (): Language => {
        if (typeof window === 'undefined') return 'en';
        const saved = sessionStorage.getItem('bharatvista-language');
        if (saved && ['en', 'hi', 'te', 'ta', 'kn'].includes(saved)) {
            return saved as Language;
        }
        return 'en';
    };

    const [language, setLanguageState] = useState<Language>(getInitialLanguage);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('bharatvista-language', lang);
        }
    };

    const t = (key: string): string => {
        return translations[language][key] || translations.en[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
}
