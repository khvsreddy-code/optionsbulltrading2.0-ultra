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
    const [updatingRoles, setUpdatingRoles] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const fetchAllUsers = async () => {
            setLoading(true);
            // DEFINITIVE FIX: Use a server-side RPC function to join 'profiles' and 'auth.users'.
            // This bypasses client-side schema cache issues that cause "could not find relationship" errors.
            // NOTE: This assumes an RPC function `get_all_user_details` exists on the Supabase project.
            const { data, error } = await supabase.rpc('get_all_user_details');

            if (error) {
                setError(`Failed to fetch user data via RPC: ${error.message}. Please ensure the 'get_all_user_details' function is created in your database.`);
                console.error("Error fetching users with RPC:", error);
            } else if (data) {
                const mappedUsers: User[] = data.map((user: any) => ({
                    user_id: user.user_id,
                    display_name: user.display_name || 'No Name',
                    email: user.email,
                    avatar_url: user.avatar_url,
                    role: user.role,
                    created_at: user.created_at,
                }));
                setUsers(mappedUsers);
            }
            setLoading(false);
        };
        fetchAllUsers();
    }, []);

    const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
        setUpdatingRoles(prev => ({ ...prev, [userId]: true }));
        try {
            const { error } = await supabase.functions.invoke('set-user-role', {
                body: { user_id: userId, role: newRole },
            });

            if (error) {
                throw new Error('Failed to update role. Check function logs.');
            }

            // Optimistically update the UI
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.user_id === userId ? { ...user, role: newRole } : user
                )
            );
        } catch (err) {
            alert(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setUpdatingRoles(prev => ({ ...prev, [userId]: false }));
        }
    };

    const filteredUsers = useMemo(() =>
        users.filter(user =>
            user.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h2 className="text-lg font-bold text-text-main mb-4">User Management ({filteredUsers.length})</h2>
                 <div className="relative mb-4">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-sm bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-text-main"
                    />
                </div>
                <div className="bg-card rounded-lg border border-border">
                    <ul className="divide-y divide-border">
                        {filteredUsers.map(user => {
                            const isUpdating = updatingRoles[user.user_id];
                            return (
                                <li key={user.user_id} className="p-3 flex items-center space-x-4">
                                    <img
                                        src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.display_name || user.email}&background=53AC53&color=fff`}
                                        alt="avatar"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="flex-grow">
                                        <p className="font-semibold text-text-main">{user.display_name || 'No Name'}</p>
                                        <p className="text-sm text-text-secondary">{user.email}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {isUpdating ? (
                                             <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <select
                                                value={user.role || 'user'}
                                                onChange={(e) => handleRoleChange(user.user_id, e.target.value as 'user' | 'admin')}
                                                className="bg-background border border-border rounded-md px-2 py-1 text-sm font-semibold"
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserManagementPanel;