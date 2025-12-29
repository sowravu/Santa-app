export type Gift = {
    id: string;
    name: string;
    price: number;
    category: string;
    isSuggested?: boolean;
};

export type ChildProfile = {
    name: string;
    age: number;
    gender: 'boy' | 'girl' | 'other';
    interests: string[];
};

export type WishListItem = {
    id: string;
    name: string;
    estimatedPrice: number; // User entered price or default
};

export type AppState = {
    step: number;
    childProfile: ChildProfile;
    wishList: WishListItem[];
    behaviorScore: number; // 1 to 5
    budget: number;
    suggestedGifts: Gift[];
};

export const INITIAL_STATE: AppState = {
    step: 1,
    childProfile: { name: '', age: 0, gender: 'other', interests: [] },
    wishList: [],
    behaviorScore: 3,
    budget: 0,
    suggestedGifts: [],
};
