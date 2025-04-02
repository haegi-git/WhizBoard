import { connectDB } from '@/lib/mongoose';
import { User } from '@/models/user';
import { serializeDoc } from '@/utils/serializeDoc';

export type UserRole = 'owner' | 'member' | 'viewer';

export interface SafeUser {
  _id: string;
  email: string;
  nickName: string;
  role?: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export const getCurrentUser = async (email: string): Promise<SafeUser | null> => {
  if (!email) return null;

  await connectDB();

  const user = await User.findOne({ email }).select('-password').lean<SafeUser>();

  return serializeDoc(user);
};
