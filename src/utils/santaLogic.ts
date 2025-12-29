import type { AppState, Gift } from '../types';



// "Santa's Secret Stash" - Backup gifts if wishlist is empty or out of budget
const SANTA_STASH: Gift[] = [
    { id: 's1', name: 'Art Set', price: 400, category: 'Drawing' },
    { id: 's2', name: 'Barbie Doll', price: 900, category: 'Toys' },
    { id: 's3', name: 'Building Blocks', price: 600, category: 'Toys' },
    { id: 's4', name: 'Story Book', price: 250, category: 'Books' },
    { id: 's5', name: 'Bicycle', price: 3500, category: 'Outdoor' },
    { id: 's6', name: 'Chocolates', price: 200, category: 'Sweets' },
    { id: 's7', name: 'RC Car', price: 1200, category: 'Toys' },
    { id: 's8', name: 'Puzzle', price: 300, category: 'Games' },
    { id: 's9', name: 'Action Figure', price: 500, category: 'Toys' },
    { id: 's10', name: 'Smart Watch (Kids)', price: 1500, category: 'Gadgets' },
];

export const calculateSuggestions = (state: AppState): Gift[] => {
    const { wishList, budget, childProfile, behaviorScore } = state;
    const suggestions: Gift[] = [];
    let currentTotal = 0;

    // 1. Prioritize Wishlist
    // Filter wishlist items that fit in budget
    const validWishes = wishList.map(w => ({

        id: w.id,
        name: w.name,
        price: w.estimatedPrice,
        category: 'Wishlist',
    })).filter(g => g.price <= budget);

    // Sort wishes by price (cheapest first allows more gifts) OR logic based on behavior?
    // If behavior is good, maybe Santa tries to get the most expensive wish possible?
    // Let's keep it simple: Try to fit as many wishes as possible.

    for (const wish of validWishes) {
        if (currentTotal + wish.price <= budget) {
            if (behaviorScore >= 3) { // Only give wishes if behavior is decent
                suggestions.push(wish);
                currentTotal += wish.price;
            }
        }
    }

    // 2. Fill remaining budget with Santa Stash
    // Filter stash by interests if possible
    const relevantStash = SANTA_STASH.filter(g =>
        childProfile.interests.some(interest => g.category.toLowerCase().includes(interest.toLowerCase()) || interest.toLowerCase().includes(g.category.toLowerCase()))
        || g.category === 'Sweets' // Everyone likes sweets
    );

    // If no specific interest match, just use whole stash sorted by price
    const pool = relevantStash.length > 0 ? relevantStash : SANTA_STASH;

    // Sort pool by price ascending to fill gaps
    const sortedPool = [...pool].sort((a, b) => a.price - b.price);

    for (const gift of sortedPool) {
        // Avoid duplicates if user wished for generic "Doll" and we have "Barbie Doll", strict check is hard, so just check ID
        if (currentTotal + gift.price <= budget) {
            suggestions.push({ ...gift, isSuggested: true });
            currentTotal += gift.price;
        }
    }

    return suggestions;
};

export const getBehaviorMessage = (score: number, name: string): string => {
    if (score === 5) return `Ho Ho Ho! ${name} has been an Angel! 🌟`;
    if (score >= 3) return `${name} has been a Good Child! 🎄`;
    return `Santa says ${name} needs to be a bit nicer next year! 🎅`;
};
