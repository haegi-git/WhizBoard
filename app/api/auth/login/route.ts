import { handleServerError } from '@/lib/handleError';
import { connectDB } from '@/lib/mongoose';
import { User } from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, message: '필수값 없음' }, { status: 400 });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: '존재하지 않는 이메일입니다.' },
        { status: 404 }
      );
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { success: false, message: '비밀번호가 틀렸습니다.' },
        { status: 401 }
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user.toObject();
    return NextResponse.json({ success: true, data: userWithoutPassword });
  } catch (err: unknown) {
    return handleServerError(err, '로그인 실패');
  }
}
