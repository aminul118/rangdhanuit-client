import serverFetch from "@/lib/server-fetch";

export const getAllUsers = async (query?: Record<string, string>) => {
  return await serverFetch.get('/users', { query });
};

export const createUser = async (userData: Record<string, unknown>) => {
  return await serverFetch.post('/users/create-user', {
    body: JSON.stringify(userData),
  });
};

export const updateUserStatus = async (id: string, status: 'ACTIVE' | 'BLOCKED') => {
  return await serverFetch.patch(`/users/${id}/status`, {
    body: JSON.stringify({ status }),
  });
};

export const updateUserRole = async (id: string, role: 'ADMIN' | 'USER') => {
  return await serverFetch.patch(`/users/${id}/role`, {
    body: JSON.stringify({ role }),
  });
};

export const deleteUser = async (id: string) => {
  return await serverFetch.delete(`/users/${id}`);
};

export const getStatistics = async () => {
  return await serverFetch.get('/users/statistics');
};
