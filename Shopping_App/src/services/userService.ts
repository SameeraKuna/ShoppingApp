import axios from 'axios';

const API_BASE = 'https://jsonplaceholder.typicode.com';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  website: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  phone: string;
  username: string;
  website: string;
}

export interface UpdateUserPayload extends Partial<CreateUserPayload> {}

/**
 * ✅ GET - Fetch all users
 */
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_BASE}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};

/**
 * ✅ GET - Fetch single user by ID
 */
export const getUserById = async (userId: number): Promise<User> => {
  try {
    const response = await axios.get<User>(`${API_BASE}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw new Error(`Failed to fetch user ${userId}`);
  }
};

/**
 * ✅ GET - Fetch user by email
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const response = await axios.get<User[]>(`${API_BASE}/users?email=${email}`);
    return response.data[0] || null;
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error);
    throw new Error(`Failed to fetch user with email ${email}`);
  }
};

/**
 * ✅ POST - Create new user
 */
export const createUser = async (userData: CreateUserPayload): Promise<User> => {
  try {
    const response = await axios.post<User>(`${API_BASE}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

/**
 * ✅ PUT - Replace entire user (full update)
 * Requires all fields to be provided
 */
export const updateUserFull = async (userId: number, userData: CreateUserPayload): Promise<User> => {
  try {
    const response = await axios.put<User>(`${API_BASE}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    throw new Error(`Failed to update user ${userId}`);
  }
};

/**
 * ✅ PATCH - Update specific fields only
 * Only provide fields that need to be updated
 */
export const updateUserPartial = async (
  userId: number,
  partialData: UpdateUserPayload
): Promise<User> => {
  try {
    const response = await axios.patch<User>(`${API_BASE}/users/${userId}`, partialData);
    return response.data;
  } catch (error) {
    console.error(`Error patching user ${userId}:`, error);
    throw new Error(`Failed to update user ${userId}`);
  }
};

/**
 * ✅ DELETE - Remove user by ID
 */
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE}/users/${userId}`);
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
    throw new Error(`Failed to delete user ${userId}`);
  }
};

/**
 * Utility: Update multiple fields at once (uses PATCH)
 */
export const updateUserFields = async (
  userId: number,
  fields: Partial<Record<keyof CreateUserPayload, string>>
): Promise<User> => {
  return updateUserPartial(userId, fields);
};

/**
 * Utility: Bulk delete multiple users
 */
export const deleteMultipleUsers = async (userIds: number[]): Promise<void> => {
  try {
    await Promise.all(userIds.map((id) => deleteUser(id)));
  } catch (error) {
    console.error('Error deleting multiple users:', error);
    throw new Error('Failed to delete some users');
  }
};
