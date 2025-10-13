import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Search } from '../common/Icons';

interface UserProfile {
    id: string; // This is the user_id
    role: 'user' | 'admin';
    avatar_url: string | null;
}

const UserManagementPanel: React.FC = () => {
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    const fetchProfiles = useCallback(async () => {
        try {
            // Revert to a direct, client-side query. This bypasses the need for a deployed Edge Function.
            // This relies on RLS policies allowing an admin to read the 'profiles' table.
            const { data, error: fetchError } = await supabase
                .from('profiles')
                .select('id, role, avatar_url');

            if (fetchError) {
                throw new Error(`Database error: ${fetchError.message}. Please ensure RLS policies allow admin access.`);
            }
            if (!Array.isArray(data)) {
                 throw new Error("Invalid data format received from the server.");
            }
            setProfiles(data);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(errorMsg);
            console.error("Error fetching profiles:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchProfiles();
    }, [fetchProfiles]);

    const filteredProfiles = useMemo(() =>
        profiles.filter(profile =>
            profile.id.toLowerCase().includes(searchTerm.toLowerCase())
        ), [profiles, searchTerm]);
        
    if (loading) {
        return <div className="p-4 text-text-secondary">Loading users...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-4 space-y-6">
            <div>
                <h2 className="text-lg font-bold text-text-main mb-4">User Profiles ({filteredProfiles.length})</h2>
                 <div className="relative mb-4">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search by user ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-sm bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-text-main"
                    />
                </div>
                <div className="bg-card rounded-lg border border-border">
                    <ul className="divide-y divide-border">
                        {filteredProfiles.map(profile => (
                            <li key={profile.id} className="p-3 flex items-center space-x-4">
                                <img
                                    src={profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.id.charAt(0)}&background=53AC53&color=fff`}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-grow overflow-hidden">
                                    <p className="font-semibold text-text-main font-mono text-sm" title={profile.id}>{profile.id}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${profile.role === 'admin' ? 'bg-primary-light text-primary' : 'bg-gray-100 dark:bg-gray-700 text-text-secondary'}`}>
                                    {profile.role}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserManagementPanel;