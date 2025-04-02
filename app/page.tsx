import Link from 'next/link';
import LoginForm from '@/components/login/LoginForm';

export default function Home() {
  return (
    <div className="bg-gray-300 flex m-auto w-[500px] rounded-lg flex-col mt-10">
      <h1>Login</h1>
      <LoginForm />
      <Link href={'/signup'}>New to Whizboard? Sign up now</Link>
    </div>
  );
}
