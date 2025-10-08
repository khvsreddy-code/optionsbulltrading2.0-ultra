import React from 'react';

interface IconLinkProps {
    title: string;
    icon: React.ElementType;
    onClick?: () => void;
    href?: string;
}

const IconLink: React.FC<IconLinkProps> = ({ title, icon: Icon, onClick, href }) => {
    const content = (
        <div 
            className="flex flex-col items-center cursor-pointer group button-press-feedback" 
            // The onClick handler is only applied if this is not an external link
            onClick={!href ? (onClick || (() => console.log(`Go to ${title}`))) : undefined}
        >
            <div className="w-14 h-14 rounded-2xl shadow-sm flex items-center justify-center mb-1 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700/50 transition-transform duration-200 ease-in-out group-hover:scale-105 group-hover:shadow-md group-hover:border-blue-500 dark:group-hover:border-blue-400">
                <Icon size={28} className="text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs text-gray-600 dark:text-slate-300 font-medium leading-tight text-center mt-1">{title}</span>
        </div>
    );

    // If an href is provided, wrap the component in an anchor tag for proper external linking
    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="no-underline">
                {content}
            </a>
        );
    }
    
    return content;
};

export default IconLink;