import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth';

export default async function RoomsPage() {
  const session = (await getServerSession(authOptions)) as Session;

  if (!session?.user) {
    return <p>로그인이 필요합니다.</p>;
  }

  return (
    <div
      className="flex flex-col
     m-auto w-[25%] bg-amber-200
      absolute top-1/2 left-1/2 transform
       -translate-x-1/2 -translate-y-1/2 rounded-lg p-4 shadow-lg"
    >
      <h1>Rooms</h1>

      <div className="flex gap-10">
        <div>
          <h1>Hello! {session.user.nickName}</h1>
          <h1>Options</h1>
          <h1>Create Room</h1>
        </div>

        <div>
          <ul>
            <li>Room 1</li>
            <li>Room 2</li>
            <li>Room 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
