import { connectDB } from '@/lib/mongoose';
import { User } from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { handleServerError } from '@/lib/handleError';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password, nickName } = await req.json();

    if (!email || !password || !nickName) {
      return NextResponse.json({ success: false, message: '필수값 없음' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: '이미 존재하는 이메일입니다.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      nickName: nickName.trim(),
      role: 'member', // 기본값으로 'member' 설정
    });

    const savedUser = await newUser.save();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    return NextResponse.json({ success: true, data: userWithoutPassword });
  } catch (err: unknown) {
    console.error('회원가입 실패:', err);
    return handleServerError(err, '회원가입 실패');
  }
}
