import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';

interface NewUser {
    user_id: string;
    display_name: string;
    email: string;
    created_at: string;
    avatar_url: string | null;
}

const NewUsersPanel: React.FC = () => {
    const [users, setUsers] = useState<NewUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // New state for invite form
    const [inviteEmail, setInviteEmail] = useState('');
    const [isInviting, setIsInviting] = useState(false);
    const [inviteError, setInviteError] = useState<string | null>(null);
    const [inviteSuccess, setInviteSuccess] = useState(false);

    const fetchNewUsers = async () => {
        setLoading(true);
        const { data, error } = await supabase.rpc('get_new_users');
        if (error) {
            setError(error.message);
            console.error("Error fetching new users:", error);
        } else {
            setUsers(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchNewUsers();
    }, []);

    const handleInviteUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsInviting(true);
        setInviteError(null);
        setInviteSuccess(false);

        try {
            const { error } = await supabase.functions.invoke('invite-user', {
                body: { email: inviteEmail },
            });

            if (error) {
                // The error object from `invoke` has a `context` property with the raw response
                const errorContext = await error.context.json();
                const detailMessage = errorContext?.error || 'An unknown error occurred while inviting the user.';
                
                // Check for the specific database error from the image
                if (detailMessage.includes('Database error saving new user')) {
                    setInviteError("Invite failed: A database configuration error occurred. This is often because the 'profiles' table is missing default values for required columns. Please check your Supabase backend setup.");
                } else {
                    setInviteError(`Invite failed: ${detailMessage}`);
                }
            } else {
                setInviteSuccess(true);
                setInviteEmail('');
                // Refresh the user list after a successful invite
                fetchNewUsers();
            }
        } catch (err) {
            setInviteError(err instanceof Error ? err.message : "An unexpected client-side error occurred.");
        } finally {
            setIsInviting(false);
        }
    };


    if (loading && users.length === 0) {
        return <div className="p-4 text-text-secondary">Loading new users...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-4 space-y-6">
            <div>
                <h2 className="text-lg font-bold text-text-main mb-4">Invite New User</h2>
                <form onSubmit={handleInviteUser} className="bg-card p-4 rounded-lg border border-border flex flex-col sm:flex-row items-center gap-4">
                    <input
                        type="email"
                        placeholder="user@example.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        required
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main"
                    />
                    <button
                        type="submit"
                        disabled={isInviting}
                        className="w-full sm:w-auto flex-shrink-0 px-6 py-2 bg-primary text-white font-semibold rounded-lg button-press-feedback disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isInviting ? 'Sending...' : 'Send Invite'}
                    </button>
                </form>
                {inviteSuccess && <p className="mt-2 text-sm text-green-600">Invitation sent successfully!</p>}
                {inviteError && <p className="mt-2 text-sm text-red-500">{inviteError}</p>}
            </div>

            <div>
                <h2 className="text-lg font-bold text-text-main mb-4">Latest Registered Users</h2>
                <div className="bg-card rounded-lg border border-border">
                    <ul className="divide-y divide-border">
                        {users.map(user => (
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
                                <div className="text-sm text-text-secondary text-right">
                                    <p>Joined:</p>
                                    <p>{new Date(user.created_at).toLocaleDateString()}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NewUsersPanel;