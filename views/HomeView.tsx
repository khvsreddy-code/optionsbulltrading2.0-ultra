import React from 'react';
import IconLink from '../components/home/IconLink';
import { Telegram, BookOpen, Clock } from '../components/common/Icons';

interface HomeViewProps {
    onNavigate: (path: string) => void;
}

const ImageCategoryCard: React.FC<{ title: string; imageUrl: string; gradientClass: string; onClick?: () => void }> = ({ title, imageUrl, gradientClass, onClick }) => (
    <div
        onClick={onClick}
        className="flex flex-col cursor-pointer group button-press-feedback"
    >
        <div className="glowing-border rounded-3xl p-[2px]">
            <div className={`inner-card-content relative z-10 h-36 w-full rounded-[1.8rem] shadow-lg overflow-hidden gradient-bg ${gradientClass}`}>
                <img
                    src={imageUrl}
                    alt={`${title.replace('\n', ' ')} illustration`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 mix-blend-plus-lighter opacity-80"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                    }}
                />
            </div>
        </div>
        <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-slate-100 mt-3 leading-tight whitespace-pre-wrap">
            {title}
        </h3>
    </div>
);

const LearningCard: React.FC<{ title: string; imageUrl: string; spanFull?: boolean; onClick?: () => void; }> = ({ title, imageUrl, spanFull, onClick }) => {
    const cleanTitle = title.replace('\n', ' ');
    const cardBaseClasses = "rounded-3xl overflow-hidden cursor-pointer group button-press-feedback transition-transform duration-300 ease-in-out hover:-translate-y-1 shadow-md hover:shadow-xl";

    return (
        <div onClick={onClick} className={`${spanFull ? 'col-span-2' : ''} ${cardBaseClasses}`}>
            <div className={`w-full bg-[#1A1A1A] ${spanFull ? 'h-40' : 'aspect-square'}`}>
                <img
                    src={imageUrl}
                    alt={cleanTitle}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                    }}
                />
            </div>
        </div>
    );
};

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
    const categories = [
        { title: "Daily Chart\nAnalysis", imageUrl: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/6c1702d9-5ff3-4580-9b26-b7dfd83e4afe.jpg", gradientClass: "gradient-1" },
        { title: "Upcoming Stock\nEvents", imageUrl: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/5694a6db-f12e-4b08-9e39-81b9de02700e.jpg", gradientClass: "gradient-2" },
        { 
            title: "Telegram\nSubscriptions", 
            imageUrl: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/6238dce0-615f-48b9-8bb1-00e845eae5b2.jpg",
            onClick: () => onNavigate('/pricing'),
            gradientClass: "gradient-3"
        },
        { title: "Courses", imageUrl: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/3a519856-32ff-4c1d-9df5-0fc01b64fb93.jpg", gradientClass: "gradient-4" },
    ];
    
    const learningItems = [
        { title: "Basics", imageUrl: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/Gemini_Generated_Image_5q6l4w5q6l4w5q6l.png", spanFull: true, onClick: () => onNavigate('/learning') },
        { title: "Bullish\nCandlesticks", imageUrl: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/Gemini_Generated_Image_bcsd0zbcsd0zbcsd%20(1).png", spanFull: false, onClick: () => onNavigate('/learning/bullish') },
        { title: "Bearish\nCandlesticks", imageUrl: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/Gemini_Generated_Image_9awzps9awzps9awz.png", spanFull: false, onClick: () => onNavigate('/learning/bearish') },
        { title: "Technical\nIndicators", imageUrl: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/Gemini_Generated_Image_7exfoa7exfoa7exf.png", spanFull: false },
        { title: "Fundamental\nAnalysis", imageUrl: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/Gemini_Generated_Image_3j8efh3j8efh3j8e.png", spanFull: false },
    ];
    
    return (
        <div className="bg-sky-50 dark:bg-slate-900 font-sans p-3 space-y-3">
            <div style={{ animationDelay: '0ms' }} className="animate-fadeInUp p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-200 dark:border-slate-700">
                <div className="grid grid-cols-4 gap-4">
                    <IconLink 
                        title="Premium Telegram" 
                        icon={Telegram} 
                        onClick={() => onNavigate('/pricing')} 
                    />
                    <IconLink 
                        title="Free Telegram Group" 
                        icon={Telegram} 
                        href="https.t.me/optionsbulltradingtelugu"
                    />
                    <IconLink 
                        title="Stock Market Library" 
                        icon={BookOpen}
                        onClick={() => onNavigate('/learning')} 
                    />
                    <IconLink 
                        title="Market Simulator" 
                        icon={Clock} 
                        onClick={() => onNavigate('/practice')}
                    />
                </div>
            </div>

            <div style={{ animationDelay: '100ms' }} className="animate-fadeInUp p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-3">What are you looking for?</h2>
                <div className="grid grid-cols-2 gap-4">
                     {categories.map(cat => (
                        <ImageCategoryCard 
                            key={cat.title}
                            title={cat.title}
                            imageUrl={cat.imageUrl}
                            gradientClass={cat.gradientClass}
                            onClick={cat.onClick}
                        />
                     ))}
                </div>
            </div>
            
            <div style={{ animationDelay: '200ms' }} className="animate-fadeInUp p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-3">Learning Library</h2>
                <div className="grid grid-cols-2 gap-4">
                    {learningItems.map((item) => (
                        <LearningCard
                            key={item.title}
                            title={item.title}
                            imageUrl={item.imageUrl}
                            spanFull={item.spanFull}
                            onClick={item.onClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeView;
