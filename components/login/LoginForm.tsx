'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [loginInput, setLoginInput] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      email: loginInput.email,
      password: loginInput.password,
      redirect: false, // ✅ 올바른 위치!
    });

    if (res?.ok) {
      alert('Login successful!');
      router.push('/rooms');
    } else {
      alert('Login failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        name="email"
        type="email"
        placeholder="your email"
        value={loginInput.email}
        onChange={handleInput}
      />
      <input
        name="password"
        type="password"
        placeholder="password"
        value={loginInput.password}
        onChange={handleInput}
      />
      <button type="submit">login</button>
    </form>
  );
}
