import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Search, Plus } from '../common/Icons';

interface CombinedUser {
    user_id: string;
    email: string;
    display_name: string;
    avatar_url: string | null;
    role: 'user' | 'admin';
    created_at: string;
}

const UserManagementPanel: React.FC = () => {
    const [users, setUsers] = useState<CombinedUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isInviting, setIsInviting] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');

    const fetchUsers = useCallback(async () => {
        try {
            const { data, error: funcError } = await supabase.functions.invoke('get-all-users');
            if (funcError) {
                const context = await (funcError as any).context.json();
                throw new Error(context?.error || `Failed to send a request to the Edge Function. Ensure the function is deployed.`);
            }
            setUsers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleInviteUser = async () => {
        if (!inviteEmail || !/\S+@\S+\.\S+/.test(inviteEmail)) {
            alert("Please enter a valid email address.");
            return;
        }
        setIsInviting(true);
        const { error } = await supabase.functions.invoke('invite-user', { body: { email: inviteEmail } });
        if (error) {
            alert(`Failed to invite user: ${error.message}`);
        } else {
            alert(`Invitation sent to ${inviteEmail}.`);
            setInviteEmail('');
            fetchUsers(); // Refresh user list
        }
        setIsInviting(false);
    };

    const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
        if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
        
        const { error } = await supabase.functions.invoke('set-user-role', { body: { user_id: userId, role: newRole } });
        if (error) {
            alert(`Failed to update role: ${error.message}`);
        } else {
            alert("Role updated successfully.");
            setUsers(prevUsers => prevUsers.map(u => u.user_id === userId ? { ...u, role: newRole } : u));
        }
    };

    const filteredUsers = useMemo(() =>
        users.filter(user =>
            user.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        ), [users, searchTerm]);

    if (loading) return <div className="p-4 text-text-secondary">Loading users...</div>;
    if (error) return <div className="p-4 text-red-500">Failed to fetch users: {error}</div>;

    return (
        <div className="p-4 space-y-6">
            <div>
                <h2 className="text-lg font-bold text-text-main">Invite New User</h2>
                <div className="flex items-center space-x-2 mt-2">
                    <input type="email" placeholder="Enter user email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)}
                        className="w-full max-w-xs bg-card border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
                    <button onClick={handleInviteUser} disabled={isInviting} className="px-4 py-2 bg-primary text-white font-semibold rounded-lg flex items-center disabled:opacity-50">
                        <Plus size={16} className="mr-1" /> {isInviting ? 'Sending...' : 'Invite'}
                    </button>
                </div>
            </div>
            <div>
                <h2 className="text-lg font-bold text-text-main mb-4">User Profiles ({filteredUsers.length})</h2>
                <div className="relative mb-4">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-sm bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
                </div>
                <div className="bg-card rounded-lg border border-border">
                    <ul className="divide-y divide-border">
                        {filteredUsers.map(user => (
                            <li key={user.user_id} className="p-3 flex items-center space-x-4">
                                <img src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.display_name}&background=53AC53&color=fff`} alt="avatar" className="w-10 h-10 rounded-full" />
                                <div className="flex-grow">
                                    <p className="font-semibold text-text-main">{user.display_name}</p>
                                    <p className="text-sm text-text-secondary">{user.email}</p>
                                </div>
                                <select value={user.role} onChange={(e) => handleRoleChange(user.user_id, e.target.value as 'user' | 'admin')}
                                    className="bg-background border border-border rounded-md px-2 py-1 text-sm font-semibold">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserManagementPanel;
