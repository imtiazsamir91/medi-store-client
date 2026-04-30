// src/lib/user-data.ts

import { getSession } from "@/session/user.session";


export const getCurrentUser = async () => {
    const session = await getSession();
    return session?.user || null;
};

export const getUserRole = async () => {
    const session = await getSession();
    return session?.user?.role || null;
};