import React, { useState } from 'react';
import { RefreshCcw, Palette, Check, Eraser } from 'lucide-react';

const COLORS = [
    { name: 'Santa Red', value: '#D42426' },
    { name: 'Forest Green', value: '#2F5233' },
    { name: 'Snow White', value: '#FFFFFF' },
    { name: 'Gold', value: '#FFD700' },
    { name: 'Skin Tone', value: '#FFE0BD' },
    { name: 'Wood Brown', value: '#8B4513' },
    { name: 'Night Blue', value: '#1E3A8A' },
    { name: 'Coal Black', value: '#1F2937' },
    { name: 'Carrot Orange', value: '#FF8C00' },
];

const INITIAL_SANTA_COLORS = { hat: '#FFFFFF', pom: '#FFFFFF', face: '#FFFFFF', beard: '#FFFFFF', suit: '#FFFFFF', belt: '#FFFFFF' };
const TARGET_SANTA_COLORS = { hat: '#D42426', pom: '#FFFFFF', face: '#FFE0BD', beard: '#FFFFFF', suit: '#D42426', belt: '#1F2937' };

const INITIAL_TREE_COLORS = { top: '#FFFFFF', middle: '#FFFFFF', bottom: '#FFFFFF', trunk: '#FFFFFF', star: '#FFFFFF', ornament1: '#FFFFFF', ornament2: '#FFFFFF' };
const TARGET_TREE_COLORS = { top: '#2F5233', middle: '#2F5233', bottom: '#2F5233', trunk: '#8B4513', star: '#FFD700', ornament1: '#D42426', ornament2: '#FFD700' };

const INITIAL_SNOWMAN_COLORS = { head: '#FFFFFF', body: '#FFFFFF', hat: '#FFFFFF', scarf: '#FFFFFF', nose: '#FFFFFF', button1: '#FFFFFF', button2: '#FFFFFF' };
const TARGET_SNOWMAN_COLORS = { head: '#FFFFFF', body: '#FFFFFF', hat: '#1F2937', scarf: '#D42426', nose: '#FF8C00', button1: '#1F2937', button2: '#1F2937' };

const INITIAL_REINDEER_COLORS = { head: '#FFFFFF', antlers: '#FFFFFF', nose: '#FFFFFF', collar: '#FFFFFF' };
const TARGET_REINDEER_COLORS = { head: '#8B4513', antlers: '#1F2937', nose: '#D42426', collar: '#FFD700' };

type ImageType = 'santa' | 'tree' | 'snowman' | 'reindeer';

const ColoringSection: React.FC = () => {
    const [selectedColor, setSelectedColor] = useState(COLORS[0].value);

    // Random start image
    const [activeImage, setActiveImage] = useState<ImageType>(() => {
        const images: ImageType[] = ['santa', 'tree', 'snowman', 'reindeer'];
        return images[Math.floor(Math.random() * images.length)];
    });

    const [santaColors, setSantaColors] = useState(INITIAL_SANTA_COLORS);
    const [treeColors, setTreeColors] = useState(INITIAL_TREE_COLORS);
    const [snowmanColors, setSnowmanColors] = useState(INITIAL_SNOWMAN_COLORS);
    const [reindeerColors, setReindeerColors] = useState(INITIAL_REINDEER_COLORS);

    const handleColor = (part: string) => {
        if (activeImage === 'santa') setSantaColors(prev => ({ ...prev, [part]: selectedColor }));
        else if (activeImage === 'tree') setTreeColors(prev => ({ ...prev, [part]: selectedColor }));
        else if (activeImage === 'snowman') setSnowmanColors(prev => ({ ...prev, [part]: selectedColor }));
        else setReindeerColors(prev => ({ ...prev, [part]: selectedColor }));
    };

    const handleReset = () => {
        if (activeImage === 'santa') setSantaColors(INITIAL_SANTA_COLORS);
        else if (activeImage === 'tree') setTreeColors(INITIAL_TREE_COLORS);
        else if (activeImage === 'snowman') setSnowmanColors(INITIAL_SNOWMAN_COLORS);
        else setReindeerColors(INITIAL_REINDEER_COLORS);
    };

    const handleNextImage = () => {
        setActiveImage(prev => {
            if (prev === 'santa') return 'tree';
            if (prev === 'tree') return 'snowman';
            if (prev === 'snowman') return 'reindeer';
            return 'santa';
        });
    };

    const isCorrect = () => {
        if (activeImage === 'santa') return JSON.stringify(santaColors) === JSON.stringify(TARGET_SANTA_COLORS);
        if (activeImage === 'tree') return JSON.stringify(treeColors) === JSON.stringify(TARGET_TREE_COLORS);
        if (activeImage === 'snowman') return JSON.stringify(snowmanColors) === JSON.stringify(TARGET_SNOWMAN_COLORS);
        return JSON.stringify(reindeerColors) === JSON.stringify(TARGET_REINDEER_COLORS);
    };

    const getTitle = () => {
        if (activeImage === 'santa') return 'Pappa Santa';
        if (activeImage === 'tree') return 'Christmas Tree';
        if (activeImage === 'snowman') return 'Frosty Snowman';
        return 'Rudolph Reindeer';
    };

    // Render Helpers (identical logic)
    const renderSantaSVG = (colors: typeof santaColors, interactive: boolean) => (
        <svg viewBox="0 0 200 200" className={`w-full h-full ${interactive ? 'cursor-pointer drop-shadow-xl' : ''}`}>
            <path d="M60 60 C 60 20, 140 20, 140 60 L 140 80 L 60 80 Z" fill={colors.hat} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('hat')} className="transition-colors duration-200" />
            <circle cx="140" cy="80" r="10" fill={colors.pom} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('pom')} className="transition-colors duration-200" />
            <path d="M70 80 L 130 80 L 130 130 C 130 150, 70 150, 70 130 Z" fill={colors.face} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('face')} className="transition-colors duration-200" />
            <path d="M60 120 Q 100 180 140 120 L 145 120 C 160 160, 40 160, 55 120 Z" fill={colors.beard} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('beard')} className="transition-colors duration-200" />
            <path d="M50 150 L 150 150 L 160 200 L 40 200 Z" fill={colors.suit} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('suit')} className="transition-colors duration-200" />
            <rect x="50" y="170" width="100" height="10" fill={colors.belt} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('belt')} className="transition-colors duration-200" />
        </svg>
    );

    const renderTreeSVG = (colors: typeof treeColors, interactive: boolean) => (
        <svg viewBox="0 0 200 200" className={`w-full h-full ${interactive ? 'cursor-pointer drop-shadow-xl' : ''}`}>
            <rect x="90" y="160" width="20" height="30" fill={colors.trunk} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('trunk')} className="transition-colors duration-200" />
            <path d="M40 160 L 160 160 L 100 100 Z" fill={colors.bottom} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('bottom')} className="transition-colors duration-200" />
            <path d="M50 110 L 150 110 L 100 60 Z" fill={colors.middle} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('middle')} className="transition-colors duration-200" />
            <path d="M60 70 L 140 70 L 100 30 Z" fill={colors.top} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('top')} className="transition-colors duration-200" />
            <path d="M100 10 L 105 25 L 120 25 L 108 35 L 112 50 L 100 40 L 88 50 L 92 35 L 80 25 L 95 25 Z" fill={colors.star} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('star')} className="transition-colors duration-200" />
            <circle cx="80" cy="140" r="5" fill={colors.ornament1} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('ornament1')} className="transition-colors duration-200" />
            <circle cx="120" cy="90" r="5" fill={colors.ornament2} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('ornament2')} className="transition-colors duration-200" />
        </svg>
    );

    const renderSnowmanSVG = (colors: typeof snowmanColors, interactive: boolean) => (
        <svg viewBox="0 0 200 200" className={`w-full h-full ${interactive ? 'cursor-pointer drop-shadow-xl' : ''}`}>
            <circle cx="100" cy="140" r="40" fill={colors.body} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('body')} className="transition-colors duration-200" />
            <circle cx="100" cy="80" r="30" fill={colors.head} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('head')} className="transition-colors duration-200" />
            <path d="M70 60 L 130 60 L 130 50 L 115 50 L 115 20 L 85 20 L 85 50 L 70 50 Z" fill={colors.hat} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('hat')} className="transition-colors duration-200" />
            <path d="M80 100 L 120 100 L 120 110 L 100 110 L 100 130 L 90 130 L 90 110 L 80 110 Z" fill={colors.scarf} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('scarf')} className="transition-colors duration-200" />
            <path d="M100 80 L 120 85 L 100 90 Z" fill={colors.nose} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('nose')} className="transition-colors duration-200" />
            <circle cx="100" cy="130" r="3" fill={colors.button1} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('button1')} className="transition-colors duration-200" />
            <circle cx="100" cy="150" r="3" fill={colors.button2} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('button2')} className="transition-colors duration-200" />
        </svg>
    );

    const renderReindeerSVG = (colors: typeof reindeerColors, interactive: boolean) => (
        <svg viewBox="0 0 200 200" className={`w-full h-full ${interactive ? 'cursor-pointer drop-shadow-xl' : ''}`}>
            <path d="M60 40 L 80 80 L 70 90 M 140 40 L 120 80 L 130 90" fill="none" stroke={colors.antlers} strokeWidth="5" strokeLinecap="round" onClick={() => interactive && handleColor('antlers')} className="transition-colors duration-200 cursor-pointer" />
            <path d="M70 80 Q 100 180 130 80 Q 100 50 70 80 Z" fill={colors.head} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('head')} className="transition-colors duration-200" />
            <circle cx="100" cy="130" r="10" fill={colors.nose} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('nose')} className="transition-colors duration-200" />
            <rect x="90" y="150" width="20" height="20" fill={colors.collar} stroke="#000000" strokeWidth="2" onClick={() => interactive && handleColor('collar')} className="transition-colors duration-200" />
        </svg>
    );

    const renderActiveSVG = (interactive: boolean) => {
        if (activeImage === 'santa') return renderSantaSVG(interactive ? santaColors : TARGET_SANTA_COLORS, interactive);
        if (activeImage === 'tree') return renderTreeSVG(interactive ? treeColors : TARGET_TREE_COLORS, interactive);
        if (activeImage === 'snowman') return renderSnowmanSVG(interactive ? snowmanColors : TARGET_SNOWMAN_COLORS, interactive);
        return renderReindeerSVG(interactive ? reindeerColors : TARGET_REINDEER_COLORS, interactive);
    };

    return (
        <section className="w-full max-w-5xl mx-auto px-4 py-8 relative">
            <div className="text-center mb-6 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold font-heading text-green-600 dark:text-green-400 mb-2 drop-shadow-sm">
                    Holiday Coloring Studio
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-200 max-w-xl mx-auto font-body">
                    Unleash your creativity! Match the reference photo or create your own masterpiece.
                </p>
            </div>

            {/* Main Container - Winter Garden Theme */}
            <div className="bg-[#86efac] dark:bg-green-900/50 rounded-[3rem] shadow-[0_20px_50px_rgba(0,128,0,0.3)] p-6 md:p-10 border-[8px] border-white/40 relative overflow-hidden">

                {/* Grass Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grass.png')] pointer-events-none mix-blend-overlay" />

                <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-start">

                    {/* Left: Interactive Canvas */}
                    <div className="lg:col-span-7 flex flex-col items-center">
                        <div className="bg-white/90 dark:bg-black/60 border-[8px] border-white/50 rounded-[2rem] p-4 w-full aspect-square max-w-[400px] flex items-center justify-center relative shadow-[inset_0_4px_10px_rgba(0,0,0,0.1)] backdrop-blur-sm">
                            {activeImage === 'santa' && renderSantaSVG(santaColors, true)}
                            {activeImage === 'tree' && renderTreeSVG(treeColors, true)}
                            {activeImage === 'snowman' && renderSnowmanSVG(snowmanColors, true)}
                            {activeImage === 'reindeer' && renderReindeerSVG(reindeerColors, true)}

                            {/* Controls Overlay */}
                            <div className="absolute top-3 right-3 flex flex-col gap-2">
                                <button
                                    onClick={handleReset}
                                    className="p-2 bg-white rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-500 transition-all shadow-sm border border-gray-100"
                                    title="Reset Colors"
                                >
                                    <Eraser size={18} />
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    className="p-2 bg-white rounded-xl hover:bg-blue-50 text-gray-700 hover:text-blue-500 transition-all shadow-sm border border-gray-100"
                                    title="Next Picture"
                                >
                                    <RefreshCcw size={18} />
                                </button>
                            </div>
                        </div>
                        <h3 className="mt-4 font-bold text-green-900 dark:text-green-100 text-2xl tracking-tight drop-shadow-sm bg-white/40 px-4 py-1 rounded-full">
                            {getTitle()}
                        </h3>
                    </div>

                    {/* Right: Controls & Reference (Sidebar) */}
                    <div className="lg:col-span-5 flex flex-col gap-6 h-full justify-center">

                        {/* Reference Image Card */}
                        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-sm rounded-[2rem] p-4 flex items-center gap-4 border-4 border-white/30 shadow-lg">
                            <div className="w-20 h-20 bg-white rounded-xl shadow-inner p-1 shrink-0 flex items-center justify-center border-2 border-dashed border-gray-200">
                                {/* Use slightly larger non-interactive SVG for reference if needed, or simply scale */}
                                <div className="w-full h-full">
                                    {renderActiveSVG(false)}
                                </div>
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-green-800 dark:text-green-100 text-lg mb-1 flex items-center gap-2">
                                    Reference
                                </h3>
                                <p className="text-xs text-green-700/80 dark:text-green-200/80 leading-tight font-medium">
                                    Use these colors as a guide.
                                </p>
                            </div>
                        </div>

                        {/* Color Palette */}
                        <div className="bg-white/60 dark:bg-black/20 backdrop-blur-sm rounded-[2rem] p-6 shadow-inner border-2 border-white/20">
                            <h3 className="font-bold text-lg mb-3 text-green-900 dark:text-green-100 flex items-center gap-2">
                                <Palette className="text-green-600" size={20} /> Palette
                            </h3>

                            <div className="grid grid-cols-5 gap-2">
                                {COLORS.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.value)}
                                        className={`
                                            relative w-10 h-10 rounded-xl transition-all duration-200 shadow-md border-2 border-white/50
                                            group hover:scale-110 hover:z-10
                                            ${selectedColor === color.value ? 'ring-4 ring-offset-2 ring-green-400 scale-110 z-10' : 'hover:border-white'}
                                        `}
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    >
                                        {/* Tick for selected color */}
                                        {selectedColor === color.value && (
                                            <span className="absolute inset-0 flex items-center justify-center text-white/90 drop-shadow-md">
                                                <Check size={18} strokeWidth={4} />
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-4 pt-3 border-t border-green-800/10 flex items-center justify-between text-xs">
                                <span className="text-green-800/70 font-medium">Selected:</span>
                                <span className="font-bold text-green-900 bg-white/50 px-3 py-1 rounded-full shadow-sm border border-white/40">
                                    {COLORS.find(c => c.value === selectedColor)?.name}
                                </span>
                            </div>
                        </div>

                        {/* Success Message */}
                        {isCorrect() && (
                            <div className="animate-bounce-in bg-yellow-100 border-4 border-yellow-300 text-yellow-800 p-4 rounded-[2rem] flex items-center gap-3 shadow-xl transform rotate-1">
                                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
                                    <Check size={24} strokeWidth={4} />
                                </div>
                                <div>
                                    <p className="font-bold text-lg">Perfect Match!</p>
                                    <p className="text-xs font-medium opacity-80">You're a true artist! 🎨</p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ColoringSection;
