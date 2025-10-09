import React from 'react';

interface IconProps {
    size?: number;
    className?: string;
}

const createIcon = (path: React.ReactNode): React.FC<IconProps> => ({ size = 24, className = '' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {path}
    </svg>
);

export const Bell = createIcon(<><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>);
export const User = createIcon(<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>);
export const BookOpen = createIcon(<><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>);
export const Target = createIcon(<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>);
export const CandlestickChart = createIcon(<><path d="M12 2V4" /><rect x="10" y="4" width="4" height="12" rx="1" /><path d="M12 16v2" /><path d="M4 8V6" /><rect x="2" y="8" width="4" height="6" rx="1" /><path d="M4 14v2" /><path d="M20 10V8" /><rect x="18" y="10" width="4" height="5" rx="1" /><path d="M20 15v2" /></>);
export const Settings = createIcon(<><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0 2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></>);
export const PieChart = createIcon(<><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></>);
export const Grid = createIcon(<><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><path d="M3 9h18" /><path d="M9 3v18" /></>);
export const Layers = createIcon(<><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>);
export const Star = createIcon(<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />);
export const HelpCircle = createIcon(<><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></>);
export const Shield = createIcon(<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />);
export const FileText = createIcon(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></>);
export const ChevronRight = createIcon(<polyline points="9 18 15 12 9 6" />);
export const ChevronDown = createIcon(<polyline points="6 9 12 15 18 9" />);
export const Sun = createIcon(<><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m4.93 19.07 1.41-1.41" /><path d="m17.66 6.34 1.41-1.41" /></>);
export const SignOut = createIcon(<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>);
export const Moon = createIcon(<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />);
export const Telegram = createIcon(<><path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" /></>);
export const X = createIcon(<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>);
export const Briefcase = createIcon(<><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>);
export const Search = createIcon(<><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>);
export const Bank = createIcon(<><path d="M3 21h18" /><path d="M5 21V8l7-5 7 5v13" /><path d="M9 21v-5" /><path d="M15 21v-5" /><path d="M12 21v-5" /><path d="M5 8h14" /></>);
export const Building = createIcon(<><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></>);
export const Bitcoin = createIcon(<><path d="M11.767 19.089c4.91 1.533 9.631-2.408 8.1-7.32-1.531-4.912-6.4-7.38-11.31-5.847-4.912 1.533-7.382 6.4-5.848 11.312 0 0 .617 1.233 1.234 2.467.617 1.233 1.234 2.466 1.234 2.466s.308.617.617 1.234a.617.617 0 0 0 1.203-.493l-1.07-4.284a.617.617 0 0 1 .493-1.203" /><path d="M8.868 15.659c.248.99.049 2.03-.54 2.872-.59.842-1.474 1.234-2.416 1.035a3.087 3.087 0 0 1-1.808-3.087c.2-1.644 1.76-2.72 3.404-2.52" /><path d="M12.94 11.57a3.087 3.087 0 0 1 3.404-2.52c.942.199 1.826.59 2.416 1.432.59.842.788 1.882.54 2.872a3.087 3.087 0 0 1-3.602 2.083" /><path d="M10.82 11.025c.348-.842 1.234-1.284 2.124-1.035.89.25 1.425 1.135 1.077 1.977" /><path d="m13.04 14.61-.443 1.772" /><path d="M10.92 11.642 9.15 14.99" /><path d="M15.42 6.728a.617.617 0 0 0-.872.872l-1.036-1.035a.617.617 0 0 0-.872.872l-1.035-1.035a.617.617 0 0 0-.872.872L9.7 7.234a.617.617 0 1 0 .872.872l1.035-1.036a.617.617 0 1 0 .872.872l1.036-1.035a.617.617 0 1 0 .872.872l.617-.617.617-.617a.617.617 0 0 0 0-.872l-1.035-1.035Z" /></>);
export const Pencil = createIcon(<><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></>);
export const LineChart = createIcon(<><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></>);
export const MessageSquare = createIcon(<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>);
export const Play = createIcon(<polygon points="5 3 19 12 5 21 5 3" />);
export const Pause = createIcon(<><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></>);
export const RotateCcw = createIcon(<><path d="M3 2v6h6" /><path d="M3 13a9 9 0 1 0 3-7.7L3 8" /></>);
export const Zap = createIcon(<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />);
export const Plus = createIcon(<><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>);
export const Minus = createIcon(<line x1="5" y1="12" x2="19" y2="12" />);
export const Swap = createIcon(<><path d="m3 17 4-4-4-4"/><path d="M7 13h14"/><path d="m21 7-4 4 4 4"/><path d="M17 11H3"/></>);
export const Home = createIcon(<><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>);
export const GraduationCap = createIcon(<><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.838l8.57 3.908a2 2 0 0 0 1.66 0l8.59-3.908Z"/><path d="M6 12v4c0 1.66 4 3 6 3s6-1.34 6-3v-4"/></>);
export const Stopwatch = createIcon(<><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3 7 5"/><path d="M19 3 17 5"/><path d="M12 3v-1"/></>);
export const CheckCircle = createIcon(<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>);
export const Menu = createIcon(<><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>);
export const Flame = createIcon(<><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-1.12-2.5-2.5-2.5-1.11 0-2.08.73-2.4 1.74" /><path d="M12.5 10.5A2.5 2.5 0 0 0 15 8c0-1.38-1.12-2.5-2.5-2.5S10 6.62 10 8c0 .99.59 1.83 1.45 2.24" /><path d="M16.5 14.5A2.5 2.5 0 0 0 19 12c0-1.38-1.12-2.5-2.5-2.5-1.11 0-2.08.73-2.4 1.74" /><path d="M4 19.5a2.5 2.5 0 0 0 2.5-2.5c0-1.38-1.12-2.5-2.5-2.5-1.11 0-2.08.73-2.4 1.74" /><path d="M12.24 16.76c.23-.23.47-.47.7-.72.23-.25.47-.5.72-.77.25-.27.5-.55.77-.85.27-.3.55-.62.85-.97.3-.35.62-.72.95-1.1.33-.38.67-.8.97-1.24.3-.44.62-.9.9-1.38.28-.48.55-1 .8-1.53.25-.53.5-1.08.72-1.65.22-.57.42-1.15.6-1.75.18-.6.35-1.22.48-1.85.13-.63.25-1.27.32-1.9.07-.63.12-1.27.12-1.9 0-.2 0-.4-.02-.6a.54.54 0 0 0-.52-.52.52.52 0 0 0-.52.52c0 .6-.05 1.2-.12 1.78-.07.58-.18 1.15-.3 1.7-.12.55-.28 1.08-.47 1.6-.2.52-.4 1-.63 1.48-.23.48-.48.95-.75 1.4-.27.45-.55.9-.85 1.32-.3.42-.62.83-.95 1.22-.33.39-.67.77-1.02 1.13-.35.36-.72.7-1.1 1.02-.38.32-.77.62-1.17.9-.4.28-.8.53-1.22.77-.42.24-.85.45-1.3.62-.45.17-.9.32-1.37.45-.47.13-.95.23-1.45.32-.5.09-1 .15-1.5.18-.5.03-1 .05-1.5.05h-.1" /></>);
export const Trophy = createIcon(<><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.45 1-1 1H5" /><path d="M14 14.66V17c0 .55.45 1 1 1h4" /><path d="M12 2C8.69 2 6 4.69 6 8v6.66L4.12 18h15.76L18 14.66V8c0-3.31-2.69-6-6-6zm0 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" /></>);


// --- New Icons for Fundamental Analysis ---
export const DollarSign = createIcon(<><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>);
export const TrendingUp = createIcon(<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>);
export const BarChart2 = createIcon(<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>);
export const Users = createIcon(<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>);
export const Scale = createIcon(<><path d="m16 16 3-8 3 8c-2 1-4 1-6 0"/><path d="m2 16 3-8 3 8c-2 1-4 1-6 0"/><path d="M12 3v18"/><path d="M3 7h18"/><path d="M3 12h18"/></>);
export const Globe = createIcon(<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>);
export const GitPullRequest = createIcon(<><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></>);
export const Sliders = createIcon(<><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></>);
export const Dna = createIcon(<><path d="M12 3a2 2 0 1 0 0 4 2 2 0 1 0 0-4"/><path d="M12 17a2 2 0 1 0 0 4 2 2 0 1 0 0-4"/><path d="M6.3 7.8A12.3 12.3 0 0 1 12 10c2.4 0 4.6-.7 6.4-1.8"/><path d="M17.7 16.2A12.3 12.3 0 0 0 12 14c-2.4 0-4.6.7-6.4 1.8"/><path d="m7.1 12.8 1-5.6"/><path d="m15.9 5.6-1 5.6"/></>);
export const TrendingDown = createIcon(<><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></>);
export const Calendar = createIcon(<><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>);


// --- Drawing Toolbar Icons ---
export const Crosshair = createIcon(<><circle cx="12" cy="12" r="10" /><path d="M22 12h-4" /><path d="M12 6V2" /><path d="M6 12H2" /><path d="M12 22v-4" /></>);
export const TrendLine = createIcon(<><path d="m3 3 18 18" /><path d="M14 4 12 6" /><path d="M20 10 18 12" /></>);
export const HorizontalLine = createIcon(<><path d="M3 12h18" /><path d="M3 6h2" /><path d="M19 6h2" /><path d="M3 18h2" /><path d="M19 18h2" /></>);
export const FibRetracement = createIcon(<><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /><path d="M8 3v18" /><path d="M16 3v18" /></>);
export const Brush = createIcon(<><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" /><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.21 0 4-1.79 4-4 0-1.67-1.34-3.02-3-3.02z" /></>);
export const TextIcon = createIcon(<><path d="M17 6.1H7a1 1 0 0 0-1 1v1.5a1 1 0 0 0 1 1h1.5a1 1 0 0 0 1-1V8.1h1.5v8.3H9.5a1 1 0 0 0-1 1v1.5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-1.5a1 1 0 0 0-1-1h-1.5V8.1H17a1 1 0 0 0 1-1v-1.5a1 1 0 0 0-1-1Z"/></>);
export const Eraser = createIcon(<><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" /><path d="M22 21H7" /><path d="m5 12 5 5" /></>);
export const Trash = createIcon(<><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>);

export const GoogleIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25C22.56 11.45 22.49 10.68 22.36 9.92H12V14.45H18.02C17.74 15.93 16.92 17.18 15.74 17.96V20.6H19.5C21.46 18.84 22.56 15.86 22.56 12.25Z" fill="#4285F4"/>
        <path d="M12 23C15.24 23 17.95 21.92 19.5 20.6L15.74 17.96C14.65 18.66 13.43 19.08 12 19.08C9.53 19.08 7.42 17.51 6.59 15.24L2.7 17.97C4.29 20.94 7.84 23 12 23Z" fill="#34A853"/>
        <path d="M6.59 15.24C6.38 14.66 6.25 14.05 6.25 13.41C6.25 12.77 6.38 12.16 6.59 11.58V8.95L2.7 6.22C1.66 8.27 1 10.74 1 13.41C1 16.08 1.66 18.55 2.7 20.6L6.59 17.88V15.24Z" fill="#FBBC05"/>
        <path d="M12 7.73C13.56 7.73 14.9 8.28 15.97 9.29L19.58 5.86C17.95 4.38 15.24 3.41 12 3.41C7.84 3.41 4.29 5.47 2.7 8.44L6.59 11.17C7.42 8.9 9.53 7.73 12 7.73Z" fill="#EA4335"/>
    </svg>
);