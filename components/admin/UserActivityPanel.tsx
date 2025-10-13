import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';

interface ActiveUser {
    user_id: string;
    display_name: string;
    email: string;
    last_sign_in_at: string;
    avatar_url: string | null;
}

const UserActivityPanel: React.FC = () => {
    const [users, setUsers] = useState<ActiveUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserActivity = async () => {
            setLoading(true);
            const { data, error } = await supabase.rpc('get_user_activity');
            if (error) {
                setError(error.message);
                console.error("Error fetching user activity:", error);
            } else {
                setUsers(data || []);
            }
            setLoading(false);
        };
        fetchUserActivity();
    }, []);

    if (loading) {
        return <div className="p-4 text-text-secondary">Loading user activity...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold text-text-main mb-4">Most Recently Active Users</h2>
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
                                <p>Last Seen:</p>
                                <p>{new Date(user.last_sign_in_at).toLocaleString()}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserActivityPanel;