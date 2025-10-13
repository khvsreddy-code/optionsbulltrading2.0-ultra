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
    
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error: funcError } = await supabase.functions.invoke('get-all-users');
            if (funcError) throw funcError;
            setUsers(data || []);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Failed to fetch users via function: ${errorMsg}`);
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
        if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
            return;
        }
        try {
            const { error } = await supabase.functions.invoke('set-user-role', {
                body: { user_id: userId, role: newRole },
            });
            if (error) throw error;
            // Refresh user list to show the change
            fetchUsers();
            alert("Role updated successfully!");
        } catch (err) {
            alert(`Failed to update role: ${err instanceof Error ? err.message : 'Unknown error'}`);
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
                        {filteredUsers.map(user => (
                            <li key={user.user_id} className="p-3 flex items-center space-x-4">
                                <img
                                    src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.display_name}&background=53AC53&color=fff`}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-grow">
                                    <p className="font-semibold text-text-main">{user.display_name}</p>
                                    <p className="text-sm text-text-secondary">{user.email}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <select
                                        value={user.role || 'user'}
                                        onChange={(e) => handleRoleChange(user.user_id, e.target.value as 'user' | 'admin')}
                                        className="bg-background border border-border rounded-md px-2 py-1 text-sm text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
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