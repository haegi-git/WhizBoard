import { NextResponse } from 'next/server';

export function handleServerError(err: unknown, logPrefix = '서버 에러') {
  console.error(`${logPrefix}:`, err);

  if (err instanceof Error) {
    return NextResponse.json(
      { success: false, message: '서버 에러 발생', error: err.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: false, message: '서버 에러 발생', error: 'Unknown error' },
    { status: 500 }
  );
}
