import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Search } from '../common/Icons';

interface User {
    user_id: string;
}

const UserManagementPanel: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        const fetchUsersFromSupportChats = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch distinct user_ids from support chats as a proxy for a user list
                const { data, error: queryError } = await supabase
                    .from('support_chats')
                    .select('user_id');

                if (queryError) throw queryError;

                // Get unique user IDs
                const userIds = [...new Set((data || []).map(item => item.user_id))].filter((id): id is string => typeof id === 'string');
                const userList = userIds.map(id => ({ user_id: id }));
                
                setUsers(userList);
            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred while fetching profiles.';
                setError(errorMsg);
                console.error("Error fetching users:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsersFromSupportChats();
    }, []);


    const filteredUsers = useMemo(() =>
        users.filter(user =>
            user.user_id.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h2 className="text-lg font-bold text-text-main mb-4">Users with Support History ({filteredUsers.length})</h2>
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
                        {filteredUsers.map(user => (
                            <li key={user.user_id} className="p-3 flex items-center space-x-4">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user.user_id.charAt(0)}&background=53AC53&color=fff`}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-grow">
                                    <p className="font-semibold text-text-main font-mono">{user.user_id}</p>
                                    <p className="text-sm text-text-secondary mt-1">Role management is temporarily disabled to ensure stability.</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserManagementPanel;