'use client';

import { useState } from 'react';

export default function SignUpForm() {
  const [signInput, setSignInput] = useState({
    email: '',
    password: '',
    nickName: '',
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setSignInput({ ...signInput, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInput),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h1>ㅎㅇ</h1>
      <input name="email" onChange={handleInput} type="email" placeholder="your email" />
      <input name="password" onChange={handleInput} type="password" placeholder="password" />
      <input name="nickName" onChange={handleInput} type="text" placeholder="nickname" />
      <button type="submit">signup</button>
    </form>
  );
}
