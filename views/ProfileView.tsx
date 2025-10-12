
import React, { useState, useRef, useEffect } from 'react';
// FIX: Updated Supabase type import to resolve module export errors.
import type { User as SupabaseUser } from '@supabase/auth-js';
import { signOutUser, updateUserProfile, uploadAvatar } from '../services/authService';
import { useProfileData } from '../services/profileService';
import { ChevronRight, Pencil, Shield, FileText, Star, SignOut } from '../components/common/Icons';
// FIX: Correctly import animejs to handle module interoperability issues.
import * as animejs from 'animejs';
const anime = (animejs as any).default;

interface ProfileViewProps {
    user: SupabaseUser | null;
    onNavigate: (path: string) => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center h-64">
        <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);


const ProfileView: React.FC<ProfileViewProps> = ({ user, onNavigate }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [userName, setUserName] = useState(user?.user_metadata?.full_name || 'Trader');
    const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${userName}&background=7065F0&color=fff`);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const viewRef = useRef<HTMLDivElement>(null);

    // Use the reactive hook to get profile data
    const profileData = useProfileData();

    useEffect(() => {
        if (viewRef.current && profileData) { // Animate when data is loaded
             const backBtn = viewRef.current.querySelector('.back-btn-anim');
            const profileHeader = viewRef.current.querySelector('.profile-header-anim');
            const subCard = viewRef.current.querySelector('.sub-card-anim');
            const menuItems = viewRef.current.querySelectorAll('.profile-menu-item-anim');
            const logoutBtn = viewRef.current.querySelector('.logout-btn-anim');

            anime.timeline({
                easing: 'easeOutExpo',
            })
            .add({
                targets: [backBtn, profileHeader],
                opacity: [0, 1],
                translateY: [-30, 0],
                duration: 600,
                delay: anime.stagger(50)
            })
            .add({
                targets: subCard,
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 500,
            }, '-=400')
            .add({
                targets: menuItems,
                opacity: [0, 1],
                translateX: [-20, 0],
                delay: anime.stagger(100),
                duration: 400,
            }, '-=300')
             .add({
                targets: logoutBtn,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 500,
            }, '-=300');
        }
    }, [profileData]); // Dependency on profileData ensures animation runs after data load

    const handleNameChange = async () => {
        const newName = prompt("Enter your new name:", userName);
        if (newName && newName !== userName && user) {
            setIsUpdating(true);
            const { error } = await updateUserProfile(user.id, { full_name: newName });
            if (error) {
                alert("Error updating name: " + error.message);
            } else {
                setUserName(newName);
                alert("Name updated successfully! The change will be fully reflected after your next login.");
            }
            setIsUpdating(false);
        }
    };

    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !user) return;

        setIsUpdating(true);
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
        setIsUpdating(false);
    };

    const renderSubscriptionCard = () => {
        if (!profileData) return <LoadingSpinner />;

        const isPremium = profileData.subscription_status === 'premium';
        const expiryDate = profileData.subscription_expires_at ? new Date(profileData.subscription_expires_at) : null;
        const isExpired = expiryDate ? expiryDate < new Date() : false;

        if (isPremium && !isExpired) {
            return (
                <div className="pro-card p-5 flex items-center justify-between bg-green-500/10 sub-card-anim">
                    <div>
                        <h3 className="font-bold text-green-600">Premium Plan</h3>
                        <p className="text-sm text-green-600/80">
                            Expires on: {expiryDate?.toLocaleDateString('en-GB')}
                        </p>
                    </div>
                    <span className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg text-sm">Active</span>
                </div>
            );
        }

        return (
            <div className="pro-card p-5 flex items-center justify-between bg-primary-light sub-card-anim">
                <div>
                    <h3 className="font-bold text-primary">{isExpired ? 'Subscription Expired' : 'Free Plan'}</h3>
                    <p className="text-sm text-primary/80">{isExpired ? 'Please renew to continue access.' : 'Access to basic learning modules.'}</p>
                </div>
                <button 
                    onClick={() => onNavigate('/pricing')}
                    className="px-4 py-2 bg-primary text-white font-semibold rounded-lg button-press-feedback text-sm">
                    {isExpired ? 'Renew' : 'Upgrade'}
                </button>
            </div>
        );
    };

    return (
        <div ref={viewRef} className="p-4 space-y-6">
            <div className="back-btn-anim">
                 <button 
                    onClick={() => window.history.back()}
                    className="flex items-center text-text-secondary font-semibold hover:text-text-main transition-colors p-2 -ml-2"
                >
                    <ChevronRight size={22} className="transform rotate-180" />
                    <span className="ml-1">Back</span>
                </button>
            </div>

            <div className="flex flex-col items-center space-y-3 profile-header-anim">
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
            
            {isUpdating ? <LoadingSpinner/> : renderSubscriptionCard()}

            <div className="space-y-2">
                <ProfileMenuItem icon={Star} label="My Subscriptions" onClick={() => onNavigate('/pricing')} className="profile-menu-item-anim" />
                <ProfileMenuItem icon={Shield} label="Privacy Policy" onClick={() => onNavigate('/policies/privacy')} className="profile-menu-item-anim" />
                <ProfileMenuItem icon={FileText} label="Terms & Conditions" onClick={() => onNavigate('/policies/terms')} className="profile-menu-item-anim" />
            </div>
            
            <div className="logout-btn-anim">
                 <button 
                    onClick={signOutUser}
                    className="w-full flex items-center justify-center p-3 space-x-2 text-red-500 font-semibold rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
                >
                    <SignOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

const ProfileMenuItem: React.FC<{icon: React.FC<any>, label: string, onClick?: () => void, className?: string}> = ({ icon: Icon, label, onClick, className }) => (
    <button onClick={onClick} className={`w-full flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:bg-background transition-colors ${className || ''}`}>
        <div className="flex items-center space-x-3">
            <Icon size={20} className="text-text-secondary" />
            <span className="font-semibold text-text-main">{label}</span>
        </div>
        <ChevronRight size={18} className="text-text-secondary" />
    </button>
);

export default ProfileView;
