
"use client";

import { useEffect, useState } from 'react';
import AdminDashboard from '../dashboard';
import { authApi } from '@/app/api/auth/auth';

export function UserProvider() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await authApi.getUser();
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <main className="flex-1 bg-muted/30">
                <div className="mx-auto max-w-7xl space-y-8">
                    <p>Loading...</p>
                </div>
            </main>
        );
    }

    return <AdminDashboard user={user} />;
}