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

    useEffect(() => {
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
        fetchNewUsers();
    }, []);

    if (loading) {
        return <div className="p-4 text-text-secondary">Loading new users...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-4">
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
    );
};

export default NewUsersPanel;