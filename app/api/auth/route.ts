import { handleServerError } from '@/lib/handleError';
import { connectDB } from '@/lib/mongoose';
import { authOptions } from './[...nextauth]/route';
import { getServerSession } from 'next-auth';

export async function GET(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const { nickName, email, id, role } = session?.user || {};
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }
    return new Response(JSON.stringify({ nickName, email, id, role }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    return handleServerError(err, 'DB 연결 실패');
  }
}
