import React, { useState } from 'react';
import NewUsersPanel from '../components/admin/NewUsersPanel';
import UserActivityPanel from '../components/admin/UserActivityPanel';
import SupportPanel from '../components/admin/SupportPanel';
import { Users, MessageSquare, Activity } from '../components/common/Icons';

type AdminTab = 'users' | 'support' | 'activity';

const AdminDashboardView: React.FC<{ onNavigate: (path: string) => void; }> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('support');

    const renderContent = () => {
        switch (activeTab) {
            case 'users':
                return <NewUsersPanel />;
            case 'support':
                return <SupportPanel />;
            case 'activity':
                return <UserActivityPanel />;
            default:
                return null;
        }
    };

    return (
        <div className="h-full flex flex-col">
            <header className="flex-shrink-0 p-4 border-b border-border">
                <h1 className="text-xl font-bold text-text-main">Admin Dashboard</h1>
            </header>
            <div className="flex-grow flex overflow-hidden">
                <nav className="w-56 bg-background border-r border-border p-4 flex flex-col">
                    <AdminTabButton
                        icon={MessageSquare}
                        label="Live Support"
                        isActive={activeTab === 'support'}
                        onClick={() => setActiveTab('support')}
                    />
                    <AdminTabButton
                        icon={Users}
                        label="New Users"
                        isActive={activeTab === 'users'}
                        onClick={() => setActiveTab('users')}
                    />
                    <AdminTabButton
                        icon={Activity}
                        label="User Activity"
                        isActive={activeTab === 'activity'}
                        onClick={() => setActiveTab('activity')}
                    />
                </nav>
                <main className="flex-1 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

const AdminTabButton: React.FC<{ icon: React.FC<any>, label: string, isActive: boolean, onClick: () => void }> = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left font-semibold transition-colors mb-1 ${isActive ? 'bg-primary-light text-primary' : 'text-text-secondary hover:bg-background hover:text-text-main'}`}
    >
        <Icon size={20} />
        <span>{label}</span>
    </button>
);

export default AdminDashboardView;