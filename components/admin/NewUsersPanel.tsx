import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Search } from '../common/Icons';

interface User {
    user_id: string;
    display_name: string;
    email: string;
    avatar_url: string | null;
    role: 'user' | 'admin' | null;
    created_at: string;
}

const UserManagementPanel: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        const fetchChatUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                // To bypass errors with fetching all profiles, we will list users who have started a support chat.
                const { data: chatData, error: chatError } = await supabase
                    .from('support_chats')
                    .select('user_id');

                if (chatError) {
                    throw new Error(`Failed to get user list from chats: ${chatError.message}`);
                }

                if (!chatData) {
                    setUsers([]);
                    return;
                }
                
                // FIX: The user_id from the database can be inferred as 'unknown'. We must filter for strings to ensure type safety.
                const userIds = [...new Set(chatData.map(c => c.user_id))].filter((id): id is string => typeof id === 'string');

                const mappedUsers: User[] = userIds.map(userId => ({
                    user_id: userId,
                    display_name: `User ${userId.substring(0, 8)}...`,
                    email: 'N/A',
                    avatar_url: `https://ui-avatars.com/api/?name=${userId.substring(0, 2)}&background=53AC53&color=fff`,
                    role: null, // Role information is unavailable without access to the 'profiles' table.
                    created_at: '',
                }));

                setUsers(mappedUsers);

            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching users.');
                console.error("Error fetching users:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchChatUsers();
    }, []);

    const filteredUsers = useMemo(() =>
        users.filter(user =>
            user.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.user_id?.toLowerCase().includes(searchTerm.toLowerCase())
        ), [users, searchTerm]);

    if (loading) {
        return <div className="p-4 text-text-secondary">Loading users...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-4 space-y-6">
            <div>
                <h2 className="text-lg font-bold text-text-main mb-4">Users Who Contacted Support ({filteredUsers.length})</h2>
                 <div className="relative mb-4">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search by ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-sm bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-text-main"
                    />
                </div>
                <div className="bg-card rounded-lg border border-border">
                    <ul className="divide-y divide-border">
                        {filteredUsers.map(user => (
                            <li key={user.user_id} className="p-3 flex items-center space-x-4">
                                <img
                                    src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.display_name}&background=53AC53&color=fff`}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-grow">
                                    <p className="font-semibold text-text-main">{user.display_name}</p>
                                    <p className="text-sm text-text-secondary">{user.user_id}</p>
                                </div>
                                {/* Role management is temporarily disabled to ensure stability. */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserManagementPanel;