export interface Monument {
    id: string;
    name: string;
    state: string;
    city: string;
    sketchfabId: string;
    panoramaId?: string;
    modelType: 'realistic' | 'artistic' | 'historical';
    hasPanorama: boolean;
    hasVR: boolean;
    description: string;
    history: string;
    builtYear: string;
    dynasty: string;
    location: {
        lat: number;
        lng: number;
    };
    imageUrl: string;
    audioGuideUrl?: string;
    audioGuideText?: string;
    audioGuideTranslations?: {
        hi?: string;
        ta?: string;
        te?: string;
    };
    featured?: boolean;
    category: 'temple' | 'fort' | 'palace' | 'monument' | 'heritage' | 'modern' | 'church' | 'memorial';
    // 3D Experience Designer Properties
    vibe?: 'golden-hour' | 'sunrise' | 'noon' | 'twilight' | 'misty' | 'academic' | 'serene' | 'peaceful' | 'somber' | 'ancient';
    ambientAudio?: 'birds' | 'temple-bells' | 'city-bustle' | 'desert-wind' | 'river-flow' | 'wind' | 'campus' | 'church-bells' | 'meditation' | 'memorial';
    highlights?: {
        title: string;
        description: string;
    }[];
}

export interface State {
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    monumentCount: number;
}
