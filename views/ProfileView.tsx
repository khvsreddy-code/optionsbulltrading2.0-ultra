import React, { useState, useRef } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { signOutUser, updateUserProfile, uploadAvatar } from '../services/authService';
import { ChevronRight, Pencil, Shield, FileText, Star, SignOut } from '../components/common/Icons';

interface ProfileViewProps {
    user: SupabaseUser | null;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState(user?.user_metadata?.full_name || 'Trader');
    const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${userName}&background=7065F0&color=fff`);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleNameChange = async () => {
        const newName = prompt("Enter your new name:", userName);
        if (newName && newName !== userName && user) {
            setLoading(true);
            const { error } = await updateUserProfile(user.id, { full_name: newName });
            if (error) {
                alert("Error updating name: " + error.message);
            } else {
                setUserName(newName);
                // The session needs to be refreshed to reflect the change everywhere
                alert("Name updated successfully! The change will be fully reflected after your next login.");
            }
            setLoading(false);
        }
    };

    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !user) return;

        setLoading(true);
        const { publicURL, error } = await uploadAvatar(user.id, file);

        if (error) {
            alert("Error uploading avatar: " + error.message);
        } else if (publicURL) {
            const { error: profileError } = await updateUserProfile(user.id, { avatar_url: publicURL });
            if (profileError) {
                alert("Error updating profile with new avatar: " + profileError.message);
            } else {
                setAvatarUrl(publicURL);
                alert("Avatar updated successfully! The change will be fully reflected after your next login.");
            }
        }
        setLoading(false);
    };

    return (
        <div className="p-4 space-y-8">
            {/* Profile Header */}
            <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                    <img
                        src={avatarUrl}
                        alt="Profile Avatar"
                        className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg"
                    />
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center border-2 border-card"
                        aria-label="Change profile picture"
                    >
                        <Pencil size={14} />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        accept="image/png, image/jpeg"
                        className="hidden"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold text-text-main">{userName}</h1>
                    <button onClick={handleNameChange} className="text-text-secondary hover:text-primary">
                        <Pencil size={16} />
                    </button>
                </div>
                <p className="text-sm text-text-secondary">{user?.email}</p>
            </div>
            
            {/* Subscription Card */}
            <div className="pro-card p-5 flex items-center justify-between bg-primary-light">
                <div>
                    <h3 className="font-bold text-primary">Free Plan</h3>
                    <p className="text-sm text-primary/80">Access to basic learning modules.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white font-semibold rounded-lg button-press-feedback text-sm">
                    Upgrade to Premium
                </button>
            </div>

            {/* Menu List */}
            <div className="space-y-2">
                <ProfileMenuItem icon={Star} label="My Subscriptions" />
                <ProfileMenuItem icon={Shield} label="Privacy Policy" />
                <ProfileMenuItem icon={FileText} label="Terms & Conditions" />
            </div>
            
            {/* Logout Button */}
            <div>
                 <button 
                    onClick={signOutUser}
                    className="w-full flex items-center justify-center p-3 space-x-2 text-red-500 font-semibold rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
                >
                    <SignOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
            {loading && (
                <div className="fixed inset-0 bg-white/50 flex items-center justify-center">
                    <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}
        </div>
    );
};

const ProfileMenuItem: React.FC<{icon: React.FC<any>, label: string, onClick?: () => void}> = ({ icon: Icon, label, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:bg-background transition-colors">
        <div className="flex items-center space-x-3">
            <Icon size={20} className="text-text-secondary" />
            <span className="font-semibold text-text-main">{label}</span>
        </div>
        <ChevronRight size={18} className="text-text-secondary" />
    </button>
);

export default ProfileView;