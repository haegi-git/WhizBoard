import { connectDB } from '@/lib/mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { handleServerError } from '@/lib/handleError';
import { User } from '@/models/user';
import { ListItem } from '@/models/listItem';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, description, tag } = body;
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response('Unauthorized', { status: 401 });
    }
    if (!title || !description) {
      return new Response('Bad Request', { status: 400 });
    }
    if (title.length < 5 || title.length > 15) {
      return new Response('Bad Request', { status: 400 });
    }
    const email = session.user.email;
    const user = await User.findOne({ email });
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }
    const userId = user._id;

    const listItem = await ListItem.create({
      title,
      description,
      tag,
      userId,
    });
    return new Response(JSON.stringify(listItem), { status: 201 });
  } catch (err: unknown) {
    return handleServerError(err, '리스트 생성 실패');
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response('Unauthorized', { status: 401 });
    }
    const email = session.user.email;
    const user = await User.findOne({ email });
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }
    const userId = user._id;
    const listItems = await ListItem.find({ userId });
    return new Response(JSON.stringify(listItems), { status: 200 });
  } catch (err: unknown) {
    return handleServerError(err, '리스트 조회 실패');
  }
}
