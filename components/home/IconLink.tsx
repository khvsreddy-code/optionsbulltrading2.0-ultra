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
            onClick={!href ? onClick : undefined}
        >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2 border-2 border-border bg-card transition-colors duration-200 group-hover:border-primary">
                <Icon size={28} className="text-primary" />
            </div>
            <span className="text-sm text-text-secondary font-medium text-center">{title}</span>
        </div>
    );

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