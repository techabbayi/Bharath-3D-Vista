import { Monument, State } from '@/types/monument';

export const monuments: Monument[] = [
    {
        id: 'taj-mahal',
        name: 'Taj Mahal',
        state: 'Uttar Pradesh',
        city: 'Agra',
        sketchfabId: 'd02e8cdef15946408be6613fc5d1f0ff',
        panoramaId: '7b43e635cbfb47719d5a124302b78579',
        modelType: 'realistic',
        hasPanorama: true,
        hasVR: true,
        description: 'An ivory-white marble mausoleum on the right bank of the river Yamuna',
        history: 'The Taj Mahal was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal. It is regarded as the finest example of Mughal architecture and is widely recognized as "the jewel of Muslim art in India".',
        builtYear: '1632-1653',
        dynasty: 'Mughal Empire',
        location: { lat: 27.1751, lng: 78.0421 },
        imageUrl: '/images/taj-mahal.jpg',
        audioGuideUrl: '',
        audioGuideText: 'Welcome to the Taj Mahal, an ivory-white marble mausoleum on the south bank of the Yamuna River. Commissioned in 1632 by the Mughal emperor Shah Jahan, this architectural masterpiece was built to house the tomb of his favorite wife, Mumtaz Mahal. It stands as a symbol of eternal love and is considered the finest example of Mughal architecture, blending Indian, Persian, and Islamic styles. As you walk through the gardens, notice the perfect symmetry of the central dome and the four minarets that tilt slightly outward, a clever design to protect the main tomb from earthquakes.',
        audioGuideTranslations: {
            hi: 'ताजमहल में आपका स्वागत है, जो यमुना नदी के किनारे स्थित एक सफेद संगमरमर का मकबरा है। 1632 में मुगल सम्राट शाहजहाँ द्वारा अपनी पसंदीदा पत्नी मुमताज महल की याद में बनवाया गया यह स्मारक, प्रेम का प्रतीक माना जाता है। यहाँ की वास्तुकला में भारतीय, फारसी और इस्लामी शैलियों का अद्भुत मिश्रण है।',
            ta: 'தாஜ்மகாலுக்கு உங்களை வரவேற்கிறோம். இது யமுனை ஆற்றின் கரையில் அமைந்துள்ள ஒரு வெள்ளை பளிங்கு கல்லறை. 1632 ஆம் ஆண்டில் முகலாய பேரரசர் ஷாஜஹான் தனது மனைவி மும்தாஜ் மகாலின் நினைவாக இதைக் கட்டினார். இது காதலின் அடையாளமாக கருதப்படுகிறது.',
            te: 'తాజ్ మహల్‌కు స్వాగతం. ఇది యమునా నది తీరాన ఉన్న తెల్లని పాలరాతి కట్టడం. 1632లో మొఘల్ చక్రవర్తి షాజహాన్ తన భార్య ముంతాజ్ మహల్ జ్ఞాపకార్థం దీనిని నిర్మించారు. ఇది ప్రేమకు చిహ్నంగా ప్రపంచ ప్రసిద్ధి గాంచింది.'
        },
        featured: true,
        category: 'monument',
        vibe: 'golden-hour',
        ambientAudio: 'birds',
        highlights: [
            { title: 'Central Dome', description: 'The main marble dome that surmounts the tomb is nearly 35 metres high.' },
            { title: 'Four Minarets', description: 'The towers are over 40 metres tall and were designed to lean slightly outward.' }
        ]
    },
    {
        id: 'jhansi-fort',
        name: 'Jhansi Fort',
        state: 'Uttar Pradesh',
        city: 'Jhansi',
        sketchfabId: '2bad6cb7f74e437281e93840e2519b43',
        modelType: 'realistic',
        hasPanorama: true,
        hasVR: true,
        description: 'A historic fort overlooking the city of Jhansi',
        history: 'The Jhansi Fort was built in 1613 by Bir Singh Deo of Orchha. It gained prominence during the Indian Rebellion of 1857 when Rani Lakshmibai used it as her stronghold.',
        builtYear: '1613',
        dynasty: 'Bundela Dynasty',
        location: { lat: 25.4333, lng: 78.5833 },
        imageUrl: '/images/taj-mahal.jpg',
        audioGuideUrl: '/audio/jhansi-fort.mp3',
        audioGuideText: 'The Jhansi Fort, also known as Jhansi ka Kila, is a fortress situated on a large hilltop called Bangira. Built by Bir Singh Deo of Orchha in 1613, it was a major stronghold during the Indian Rebellion of 1857. This fort is legendary for the bravery of Rani Lakshmibai, who fought valiantly against the British. The architecture features massive stone walls and historic landmarks like the Rani Mahal. As you explore, you can feel the spirit of resistance and the rich history of the Bundela dynasty that once ruled these lands.',
        audioGuideTranslations: {
            hi: 'झांसी का किला ऐतिहासिक गौरव का प्रतीक है। 1613 में ओरछा के राजा बीर सिंह देव द्वारा निर्मित, यह किला 1857 के विद्रोह में रानी लक्ष्मीबाई की वीरता के लिए प्रसिद्ध है। इसकी विशाल दीवारें और रानी महल आज भी उस समय के साहस की कहानी सुनाते हैं।',
            ta: 'ஜான்சி கோட்டை இந்தியாவின் வீரத்தின் அடையாளம். 1613 இல் கட்டப்பட்ட இந்த கோட்டை, 1857 சுதந்திரப் போராட்டத்தில் ராணி லட்சுமிபாயின் வீரத்திற்கு பெயர்பெற்றது. இதன் பிரம்மாண்டமான சுவர்கள் வரலாற்றை பறைசாற்றுகின்றன.',
            te: 'ఝాన్సీ కోట భారతీయ ధైర్యసాహసాలకు నిదర్శనం. 1613లో నిర్మించబడిన ఈ కోట, 1857 స్వాతంత్ర్య పోరాటంలో రాణి లక్ష్మీబాయి ప్రదర్శించిన వీరత్వానికి ప్రసిద్ధి చెందింది.'
        },
        featured: true,
        category: 'fort',
        vibe: 'golden-hour',
        ambientAudio: 'wind',
        highlights: [
            { title: 'Fort Walls', description: 'Massive stone walls that stretch for kilometers around the fort.' },
            { title: 'Rani Mahal', description: 'The palace where Rani Lakshmibai lived during the rebellion.' }
        ]
    },
    {
        id: 'ram-mandir',
        name: 'Ram Mandir',
        state: 'Uttar Pradesh',
        city: 'Ayodhya',
        sketchfabId: '2d67b50844e248b6a3ff0034ff27a604',
        modelType: 'realistic',
        hasPanorama: false,
        hasVR: true,
        description: 'A grand Hindu temple dedicated to Lord Ram',
        history: 'The Ram Janmabhoomi Mandir is a Hindu temple built at the site of Ram Janmabhoomi, the birthplace of Rama. It is designed in the traditional Nagara style of architecture.',
        builtYear: '2024',
        dynasty: 'Modern Era',
        location: { lat: 26.7922, lng: 82.1998 },
        imageUrl: '/images/taj-mahal.jpg',
        audioGuideUrl: '/audio/ram-mandir.mp3',
        audioGuideText: 'The Ram Mandir in Ayodhya is a monumental Hindu temple built at the site of Ram Janmabhoomi, the birthplace of Lord Rama. Designed in the traditional Nagara style of Hindu temple architecture, it is constructed primarily with pink sandstone from Rajasthan. The temple complex is one of the largest in India, featuring a grand 161-foot-high spire. Every pillar and stone in this temple is intricately carved with scenes from the Ramayana, making it not just a place of worship but a massive museum of Indian culture and spirituality.',
        audioGuideTranslations: {
            hi: 'अयोध्या का राम मंदिर भगवान राम की जन्मभूमि पर बना एक भव्य मंदिर है। पारंपरिक नागर शैली में निर्मित यह मंदिर राजस्थान के गुलाबी बलुआ पत्थरों से बना है। इसकी नक्काशी में रामायण के दृश्यों को बहुत ही सुंदरता से उकेरा गया है।',
            ta: 'அயோத்தி ராமர் கோவில் இந்துக்களின் புனிதமான தலம். பாரம்பரிய நகர பாணியில் கட்டப்பட்ட இந்த கோவில், ராஜஸ்தானின் இளஞ்சிவப்பு கற்களால் ஆனது. ராமாயணத்தின் காட்சிகள் இங்கு அழகாக செதுக்கப்பட்டுள்ளன.',
            te: 'అయోధ్య రామ మందిరం భగవాన్ శ్రీరాముడి జన్మస్థలంలో నిర్మించబడిన అత్యంత భవ్యమైన కట్టడం. ఇది భారతీయ సంస్కృతి మరియు ఆధ్యాత్మికతకు చిహ్నం.'
        },
        featured: true,
        category: 'temple',
        vibe: 'twilight',
        ambientAudio: 'temple-bells',
        highlights: [
            { title: 'Temple Spire', description: 'The main Shikhara rises 161 feet high, dominating the Ayodhya skyline.' },
            { title: 'Pink Sandstone', description: 'The entire structure is built using Bansi Paharpur sandstone from Rajasthan.' }
        ]
    },
    {
        id: 'charminar',
        name: 'Charminar',
        state: 'Telangana',
        city: 'Hyderabad',
        sketchfabId: '82603f1fe3ed4c31b37786e2bc2b63b0',
        modelType: 'realistic',
        hasPanorama: true,
        hasVR: true,
        description: 'A 16th-century mosque and monument',
        history: 'The Charminar, constructed in 1591, is a monument and mosque located in Hyderabad. It was built to celebrate the end of a deadly plague.',
        builtYear: '1591',
        dynasty: 'Qutb Shahi Dynasty',
        location: { lat: 17.3616, lng: 78.4747 },
        imageUrl: '/images/hawa-mahal.jpg',
        audioGuideUrl: '/audio/charminar.mp3',
        audioGuideText: 'The Charminar, which literally translates to Four Minarets, is the most iconic monument of Hyderabad. Built in 1591 by Muhammad Quli Qutb Shah, it was constructed to commemorate the end of a devastating plague. The structure is a grand blend of Indo-Islamic architecture, with its four massive arches facing the four cardinal directions. On the top floor, there is a small mosque which is the oldest surviving mosque in the city. The bustling markets surrounding the Charminar have been active for over four centuries, reflecting the city’s vibrant history.',
        audioGuideTranslations: {
            hi: 'चारमीनार हैदराबाद की सबसे प्रसिद्ध इमारत है। 1591 में कुली कुतुब शाह द्वारा निर्मित, यह स्मारक प्लेग की समाप्ति की खुशी में बनाया गया था। इसके चार विशाल मेहराब चारों दिशाओं में खुलते हैं और इसकी ऊपरी मंजिल पर एक पुरानी मस्जिद है।',
            ta: 'சார்மினார் ஹைதராபாத்தின் அடையாளமாகும். 1591 இல் முகமது குலி குதுப் ஷாவால் கட்டப்பட்டது. நான்கு மினார்கள் கொண்ட இந்த கட்டிடம், இந்தோ-இஸ்லாமிய கட்டிடக்கலையின் சிறந்த எடுத்துக்காட்டாகும்.',
            te: 'చార్మినార్ హైదరాబాద్ నగరానికి తలమానికం. 1591లో మొహమ్మద్ కులీ కుతుబ్ షా ప్లేగు వ్యాధి నిర్మూలనకు గుర్తుగా దీనిని నిర్మించారు. దీని నాలుగు దిశల్లోని ఆర్చ్‌లు నగర వైభవాన్ని చాటిచెబుతాయి.'
        },
        featured: true,
        category: 'monument',
        vibe: 'noon',
        ambientAudio: 'city-bustle',
        highlights: [
            { title: 'Four Arches', description: 'The monument gets its name from the four elegant arches that face four streets.' },
            { title: 'Upper Mosque', description: 'The top floor has a small mosque with 45 prayer spaces.' }
        ]
    },
    {
        id: 'kashi-vishwanath',
        name: 'Kashi Vishwanath Temple',
        state: 'Uttar Pradesh',
        city: 'Varanasi',
        sketchfabId: '1b31f9e888b640dbbbab371aa8550697',
        modelType: 'realistic',
        hasPanorama: false,
        hasVR: true,
        description: 'One of the most famous Hindu temples dedicated to Lord Shiva',
        history: 'Kashi Vishwanath Temple is located on the western bank of the holy river Ganga. It is one of the twelve Jyotirlingas, the holiest of Shiva temples.',
        builtYear: '1780',
        dynasty: 'Maratha Empire',
        location: { lat: 25.3109, lng: 83.0107 },
        imageUrl: '/images/taj-mahal.jpg',
        audioGuideUrl: '/audio/kashi-vishwanath.mp3',
        audioGuideText: 'The Kashi Vishwanath Temple is one of the holiest Hindu temples dedicated to Lord Shiva, located in the ancient city of Varanasi on the banks of the Ganges. The temple has been destroyed and rebuilt several times throughout history; the current structure was built by the Maratha ruler Ahilyabai Holkar in 1780. The temple is famous for its massive gold-plated spires, which contain over 800 kilograms of pure gold. Walking through the narrow lanes to reach this temple is a spiritual journey in itself, connecting millions of devotees to the divine energy of Shiva.',
        audioGuideTranslations: {
            hi: 'काशी विश्वनाथ मंदिर भगवान शिव के सबसे पवित्र स्थानों में से एक है। वाराणसी में गंगा के तट पर स्थित यह मंदिर आस्था का केंद्र है। इसका वर्तमान स्वरूप 1780 में मराठा रानी अहिल्याबाई होलकर ने बनवाया था और इसके शिखर पर 800 किलो सोना चढ़ा है।',
            ta: 'காசி விஸ்வநாதர் கோவில் வாரணாசியில் கங்கை நதிக்கரையில் அமைந்துள்ள புனித தலமாகும். 1780 இல் ராணி அகில்யாபாய் ஹோல்கரால் கட்டப்பட்டது. இதன் விமானத்தில் 800 கிலோ தங்கம் உள்ளது.',
            te: 'కాశీ విశ్వనాథ ఆలయం అత్యంత పురాతనమైన మరియు పవిత్రమైన పుణ్యక్షేత్రం. 1780లో అహల్యాబాయి హోల్కర్ ఈ ఆలయాన్ని నిర్మించారు. గంగా నది తీరాన ఉన్న ఈ ఆలయ శిఖరానికి బంగారు పూత పూయబడింది.'
        },
        featured: true,
        category: 'temple',
        vibe: 'misty',
        ambientAudio: 'river-flow',
        highlights: [
            { title: 'Golden Spire', description: 'The temple features 800kg of gold donated by Maharaja Ranjit Singh.' },
            { title: 'Ganga Ghats', description: 'Connected to the holy river via the modern Kashi Vishwanath Corridor.' }
        ]
    },
    {
        id: 'kurukshetra-university',
        name: 'Kurukshetra University',
        state: 'Haryana',
        city: 'Kurukshetra',
        sketchfabId: '4ea043865d8d4a4ab6eac2e0777753e0',
        modelType: 'realistic',
        hasPanorama: true,
        hasVR: true,
        description: 'A premier university in the historic land of Kurukshetra',
        history: 'Kurukshetra University was established in 1956. It is located in the sacred land where the epic Mahabharata battle was fought, making it a center of both modern education and ancient wisdom.',
        builtYear: '1956',
        dynasty: 'Modern India',
        location: { lat: 29.9697, lng: 76.8450 },
        imageUrl: '/images/taj-mahal.jpg',
        audioGuideUrl: '/audio/kurukshetra-university.mp3',
        audioGuideText: 'Kurukshetra University, established in 1956, is a premier institution located in the holy city of Kurukshetra. The university stands on a sprawling 473-acre campus, blending modern education with the deep philosophical roots of the land where the Bhagavad Gita was delivered. It is renowned for its research in Indology and social sciences. The campus also features an archaeological museum housing rare artifacts that provide a glimpse into India’s ancient history and the epic era of the Mahabharata.',
        audioGuideTranslations: {
            hi: 'कुरुक्षेत्र विश्वविद्यालय 1956 में स्थापित हरियाणा का एक प्रमुख शिक्षण संस्थान है। यह उसी पावन भूमि पर स्थित है जहाँ श्रीमद्भगवद्गीता का उपदेश दिया गया था। यहाँ का संग्रहालय प्राचीन भारतीय इतिहास की झलक पेश करता है।',
            ta: 'குருக்ஷேத்ரா பல்கலைக்கழகம் 1956 இல் நிறுவப்பட்டது. பகவத் கீதை அருளப்பட்ட புனித பூமியில் அமைந்துள்ள இந்த பல்கலைக்கழகம், நவீன கல்வி மற்றும் பண்டைய ஞானத்தின் சங்கமமாக உள்ளது.',
            te: 'కురుక్షేత్ర విశ్వవిద్యాలయం 1956లో స్థాపించబడింది. భగవద్గీత బోధించబడిన పవిత్ర భూమిపై ఉన్న ఈ విద్యాలయం, ఆధునిక విద్యను మరియు ప్రాచీన భారతీయ సంస్కృతిని మేళవిస్తుంది.'
        },
        featured: false,
        category: 'modern',
        vibe: 'academic',
        ambientAudio: 'campus',
        highlights: [
            { title: 'Main Campus', description: 'Sprawling 473-acre campus with modern infrastructure.' },
            { title: 'Archaeological Museum', description: 'Houses artifacts from the Mahabharata period.' }
        ]
    },
    {
        id: 'christ-church',
        name: 'Christ Church',
        state: 'Uttar Pradesh',
        city: 'Allahabad',
        sketchfabId: 'ccf6b01ce80643d590ce7e2f28d353dd',
        modelType: 'realistic',
        hasPanorama: true,
        hasVR: true,
        description: 'A historic Anglican church known for its Gothic architecture',
        history: 'Christ Church is one of the oldest churches in North India, built in 1840. It showcases beautiful Gothic architecture and stained glass windows.',
        builtYear: '1840',
        dynasty: 'British Raj',
        location: { lat: 25.4475, lng: 81.8345 },
        imageUrl: '/images/mysore-palace.jpg',
        audioGuideUrl: '/audio/christ-church.mp3',
        audioGuideText: 'Christ Church in Allahabad is one of the oldest Anglican churches in North India, built in 1840. It is a stunning example of Gothic architecture, characterized by its pointed arches, ribbed vaults, and tall spires. The church is famous for its intricate stained glass windows that depict biblical stories with vibrant colors. The serene atmosphere and historical significance make it a peaceful retreat in the heart of the city, standing as a testament to the diverse cultural and religious history of the region.',
        audioGuideTranslations: {
            hi: 'इलाहाबाद का क्राइस्ट चर्च उत्तर भारत के सबसे पुराने चर्चों में से एक है, जिसे 1840 में बनाया गया था। यह गोथिक वास्तुकला का एक बेहतरीन नमूना है और यहाँ की खिड़कियों पर बनी रंगीन कांच की नक्काशी बेहद खूबसूरत है।',
            ta: 'அலகாபாத்தில் உள்ள கிறிஸ்ட் சர்ச் 1840 இல் கட்டப்பட்டது. இது கோதிக் கட்டிடக்கலைக்கு ஒரு சிறந்த எடுத்துக்காட்டாகும். இங்குள்ள வண்ணமயமான கண்ணாடி ஓவியங்கள் மிகவும் புகழ்பெற்றவை.',
            te: 'అలహాబాద్‌లోని క్రైస్ట్ చర్చ్ 1840లో నిర్మించబడింది. ఇది గోతిక్ నిర్మాణ శైలికి అద్భుత నిదర్శనం. ఇక్కడి రంగురంగుల గాజు కిటికీలు బైబిల్ గాథలను కళ్ళకు కట్టినట్లు చూపుతాయి.'
        },
        featured: false,
        category: 'church',
        vibe: 'serene',
        ambientAudio: 'church-bells',
        highlights: [
            { title: 'Gothic Architecture', description: 'Beautiful pointed arches and ribbed vaults.' },
            { title: 'Stained Glass', description: 'Exquisite stained glass windows depicting biblical scenes.' }
        ]
    },
    {
        id: 'lotus-temple',
        name: 'Lotus Temple',
        state: 'Delhi',
        city: 'New Delhi',
        sketchfabId: '18da113a4c9e4fe4a557a488df6c0b43',
        modelType: 'realistic',
        hasPanorama: true,
        hasVR: true,
        description: 'A Baháʼí House of Worship notable for its flowerlike shape',
        history: 'The Lotus Temple was completed in 1986. It has won numerous architectural awards and become one of the most visited buildings in the world.',
        builtYear: '1986',
        dynasty: 'Modern India',
        location: { lat: 28.5275, lng: 77.2785 },
        imageUrl: '/images/qutub-minar.jpg',
        audioGuideUrl: '/audio/lotus-temple.mp3',
        audioGuideText: 'The Lotus Temple, located in New Delhi, is a Baháʼí House of Worship famous for its flower-like shape. Completed in 1986, the structure is made of 27 free-standing marble-clad petals arranged in clusters of three to form nine sides. It is open to people of all religions, serving as a sanctuary for silent prayer and meditation. The architecture has won numerous international awards for its innovative design and use of white marble. Surrounded by nine ponds and green gardens, it offers a tranquil escape from the bustling city life.',
        audioGuideTranslations: {
            hi: 'नई दिल्ली का लोटस टेंपल अपनी कमल जैसी आकृति के लिए प्रसिद्ध है। 1986 में बना यह मंदिर बहाई उपासना केंद्र है जहाँ किसी भी धर्म के लोग आकर शांति से ध्यान लगा सकते हैं।',
            ta: 'புதுடெல்லியில் உள்ள லோட்டஸ் டெம்பிள் அதன் தாமரை வடிவத்திற்கு பெயர் பெற்றது. 1986 இல் திறக்கப்பட்ட இந்த கோவில், தியானம் மற்றும் அமைதிக்கு ஏற்ற இடமாகும்.',
            te: 'న్యూఢిల్లీలోని లోటస్ టెంపుల్ తన కమలం ఆకారపు నిర్మాణం వల్ల ప్రపంచ ప్రసిద్ధి చెందింది. 1986లో పూర్తయిన ఈ కట్టడం, అన్ని మతాల వారు ప్రశాంతంగా ధ్యానం చేసుకునేందుకు అనువైన చోటు.'
        },
        featured: true,
        category: 'temple',
        vibe: 'peaceful',
        ambientAudio: 'meditation',
        highlights: [
            { title: 'Lotus Structure', description: '27 marble-clad petals arranged in clusters to form the lotus shape.' },
            { title: 'Prayer Hall', description: 'Massive central hall that can seat 1,300 people.' }
        ]
    },
    {
        id: 'jallianwala-bagh',
        name: 'Jallianwala Bagh',
        state: 'Punjab',
        city: 'Amritsar',
        sketchfabId: '1a136321dfa5400ba1f6460c291a4236',
        modelType: 'realistic',
        hasPanorama: true,
        hasVR: true,
        description: 'A public garden that houses a memorial of national importance',
        history: 'Jallianwala Bagh is the site of the 1919 Amritsar massacre where British troops fired on unarmed civilians. The memorial stands as a somber reminder of India\'s freedom struggle.',
        builtYear: '1951',
        dynasty: 'Independent India',
        location: { lat: 31.6229, lng: 74.8768 },
        imageUrl: '/images/red-fort.jpg',
        audioGuideUrl: '/audio/jallianwala-bagh.mp3',
        audioGuideText: 'Jallianwala Bagh is a public garden in Amritsar that holds a significant place in India’s struggle for independence. It is the site of the tragic 1919 massacre where hundreds of unarmed civilians were killed by British colonial troops. Today, it stands as a somber memorial, featuring a martyr’s flame that burns eternally. Visitors can still see bullet marks on the walls and the well where many jumped to save their lives. The site serves as a powerful reminder of the sacrifices made for freedom and is a place of national mourning and respect.',
        audioGuideTranslations: {
            hi: 'जलियांवाला बाग अमृतसर में स्थित एक ऐतिहासिक उद्यान है। यह 1919 के उस भीषण नरसंहार का साक्षी है जिसने भारत के स्वतंत्रता आंदोलन की दिशा बदल दी। यहाँ की अमर ज्योति शहीदों के बलिदान की याद दिलाती है।',
            ta: 'ஜாலியன்வாலா பாக் இந்தியாவின் சுதந்திரப் போராட்ட வரலாற்றில் ஒரு முக்கிய இடமாகும். 1919 இல் நடந்த துயரமான சம்பவத்தை நினைவுபடுத்தும் இந்த இடம், தியாகிகளின் நினைவகமாக உள்ளது.',
            te: 'అమృతసరంలోని జలియన్ వాలా బాగ్ భారత స్వతంత్ర సంగ్రామంలో ఒక అత్యంత ముఖ్యమైన మరియు విషాదకరమైన ప్రదేశం. 1919లో జరిగిన కాల్పుల్లో అమరులైన వారి జ్ఞాపకార్థం ఇక్కడ నిత్యం అమర జ్యోతి వెలుగుతూనే ఉంటుంది.'
        },
        featured: true,
        category: 'memorial',
        vibe: 'somber',
        ambientAudio: 'memorial',
        highlights: [
            { title: 'Memorial Flame', description: 'Eternal flame that burns in memory of the martyrs.' },
            { title: 'Martyrs\' Well', description: 'The well where many people jumped to escape the firing.' }
        ]
    },
    {
        id: 'dashavatara-temple',
        name: 'Dashavatara Temple',
        state: 'Uttar Pradesh',
        city: 'Deogarh',
        sketchfabId: '40091045edf84ef7ab601de502d59aec',
        modelType: 'realistic',
        hasPanorama: true,
        hasVR: true,
        description: 'An ancient Hindu temple dedicated to Vishnu',
        history: 'The Dashavatara Temple is one of the earliest stone temples in India, dating back to the 6th century. It showcases the evolution of Hindu temple architecture.',
        builtYear: '6th Century',
        dynasty: 'Gupta Empire',
        location: { lat: 24.5333, lng: 78.2333 },
        imageUrl: '/images/konark-temple.jpg',
        audioGuideUrl: '/audio/dashavatara-temple.mp3',
        audioGuideText: 'The Dashavatara Temple in Deogarh is one of the earliest known stone temples in North India, dating back to the Gupta period in the 6th century. It is a masterpiece of early Hindu temple architecture, featuring a grand spire known as a Shikhara. The temple is dedicated to Lord Vishnu and is famous for its intricate relief carvings depicting the ten avatars of Vishnu. The panels on the walls show scenes of cosmic creation and divine legends, representing a high point in ancient Indian art and religious expression.',
        audioGuideTranslations: {
            hi: 'देवगढ़ का दशावतार मंदिर छठी शताब्दी का है और यह भारत के शुरुआती पत्थर के मंदिरों में से एक है। भगवान विष्णु को समर्पित इस मंदिर की दीवारों पर दशावतारों को बहुत ही बारीकी से उकेरा गया है।',
            ta: 'தேவ்கரில் உள்ள தசாவதார கோவில் 6 ஆம் நூற்றாண்டைச் சேர்ந்தது. இது ஆரம்பகால இந்துக் கோவில் கட்டிடக்கலைக்கு ஒரு சிறந்த எடுத்துக்காட்டாகும். விஷ்ணுவின் பத்து அவதாரங்கள் இங்கு செதுக்கப்பட்டுள்ளன.',
            te: 'దేవ్‌గఢ్‌లోని దశావతార ఆలయం 6వ శతాబ్దానికి చెందిన అత్యంత పురాతనమైన శిలా కట్టడం. ఇది విష్ణుమూర్తి యొక్క దశావతారాలను అత్యంత మనోహరంగా చాటిచెప్పే అద్భుత శిల్పకళా క్షేత్రం.'
        },
        featured: false,
        category: 'temple',
        vibe: 'ancient',
        ambientAudio: 'temple-bells',
        highlights: [
            { title: 'Gupta Architecture', description: 'Fine example of early North Indian temple architecture.' },
            { title: 'Vishnu Sculptures', description: 'Intricate carvings depicting the ten avatars of Vishnu.' }
        ]
    },
    {
        id: 'red-fort',
        name: 'Red Fort',
        state: 'Delhi',
        city: 'New Delhi',
        sketchfabId: '74ff6d703a174f9fb1ba266003f5c4fc',
        modelType: 'realistic',
        hasPanorama: true,
        hasVR: true,
        description: 'A historic fort in Old Delhi that served as the main residence of Mughal emperors',
        history: 'Emperor Shah Jahan commissioned construction of the Red Fort in 1639. It represents the peak of Mughal creativity.',
        builtYear: '1639-1648',
        dynasty: 'Mughal Empire',
        location: { lat: 28.6562, lng: 77.2410 },
        imageUrl: '/images/red-fort.jpg',
        audioGuideUrl: '/audio/red-fort.mp3',
        audioGuideText: 'The Red Fort, or Lal Qila, is a massive 17th-century fortress built by Mughal Emperor Shah Jahan when he moved his capital to Delhi. Made of red sandstone, the fort represents the peak of Mughal architectural creativity under Shah Jahan. It served as the residence of the Mughal emperors for nearly 200 years. The fort complex features beautiful structures like the Diwan-i-Aam, the Diwan-i-Khas, and the Moti Masjid. Every year on Independence Day, the Prime Minister of India hoists the national flag here, continuing its legacy as a symbol of Indian sovereignty.',
        audioGuideTranslations: {
            hi: 'लाल किला दिल्ली का एक ऐतिहासिक किला है जिसे शाहजहाँ ने अपनी राजधानी के रूप में बनवाया था। यह किला भारत की संप्रभुता का प्रतीक है और हर साल यहाँ स्वतंत्रता दिवस पर तिरंगा फहराया जाता है।',
            ta: 'செங்கோட்டை 17 ஆம் நூற்றாண்டில் பேரரசர் ஷாஜஹானால் கட்டப்பட்டது. இது இந்தியாவின் இறையாண்மையின் அடையாளமாகும். ஒவ்வொரு ஆண்டும் சுதந்திர தினத்தன்று இங்கு தேசிய கொடி ஏற்றப்படுகிறது.',
            te: 'ఎర్రకోట భారతదేశ సార్వభౌమత్వానికి మరియు స్వేచ్ఛకు చిహ్నం. 17వ శతాబ్దంలో షాజహాన్ దీనిని నిర్మించారు. ప్రతిఏటా స్వాతంత్ర్య దినోత్సవం రోజున ఇక్కడ భారత జాతీయ పతాకాన్ని ఎగురవేస్తారు.'
        },
        featured: true,
        category: 'fort',
        vibe: 'noon',
        ambientAudio: 'city-bustle',
        highlights: [
            { title: 'Lahori Gate', description: 'The main entrance named for its orientation towards the city of Lahore.' },
            { title: 'Diwan-i-Khas', description: 'The Hall of Private Audience, where the emperor met his ministers.' }
        ]
    }
];

export const states: State[] = [
    {
        name: 'Uttar Pradesh',
        slug: 'uttar-pradesh',
        description: 'Home to the iconic Taj Mahal, Ram Mandir and Kashi Vishwanath',
        imageUrl: '/images/states/uttar-pradesh.jpg',
        monumentCount: monuments.filter(m => m.state === 'Uttar Pradesh').length
    },
    {
        name: 'Delhi',
        slug: 'delhi',
        description: 'The capital city with centuries of history',
        imageUrl: '/images/states/delhi.jpg',
        monumentCount: monuments.filter(m => m.state === 'Delhi').length
    },
    {
        name: 'Rajasthan',
        slug: 'rajasthan',
        description: 'Land of kings with magnificent forts and palaces',
        imageUrl: '/images/states/rajasthan.jpg',
        monumentCount: monuments.filter(m => m.state === 'Rajasthan').length
    },
    {
        name: 'Telangana',
        slug: 'telangana',
        description: 'A land of rich history and modern vibrancy',
        imageUrl: '/images/states/rajasthan.jpg',
        monumentCount: monuments.filter(m => m.state === 'Telangana').length
    },
    {
        name: 'Karnataka',
        slug: 'karnataka',
        description: 'Rich cultural heritage and architectural marvels',
        imageUrl: '/images/states/karnataka.jpg',
        monumentCount: monuments.filter(m => m.state === 'Karnataka').length
    },
    {
        name: 'Maharashtra',
        slug: 'maharashtra',
        description: 'Gateway to India and historical landmarks',
        imageUrl: '/images/states/maharashtra.jpg',
        monumentCount: monuments.filter(m => m.state === 'Maharashtra').length
    },
    {
        name: 'Haryana',
        slug: 'haryana',
        description: 'Land of the Mahabharata and modern education',
        imageUrl: '/images/states/rajasthan.jpg',
        monumentCount: monuments.filter(m => m.state === 'Haryana').length
    },
    {
        name: 'Punjab',
        slug: 'punjab',
        description: 'Land of five rivers and freedom struggle',
        imageUrl: '/images/states/rajasthan.jpg',
        monumentCount: monuments.filter(m => m.state === 'Punjab').length
    },
];

export function getMonumentById(id: string): Monument | undefined {
    return monuments.find(m => m.id === id);
}

export function getMonumentsByState(state: string): Monument[] {
    return monuments.filter(m => m.state === state);
}

export function getFeaturedMonuments(): Monument[] {
    return monuments.filter(m => m.featured);
}

export function getStateBySlug(slug: string): State | undefined {
    return states.find(s => s.slug === slug);
}
