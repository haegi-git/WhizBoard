import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-300 flex m-auto w-[500px] rounded-lg flex-col mt-10">
      <h1>Login</h1>
      <form className="flex flex-col">
        <input placeholder="email" />
        <input placeholder="password" />
        <button type="submit">login</button>
        <Link href={"/signup"}>New to Whizboard? Sign up now</Link>
        <button>Google</button>
      </form>
    </div>
  );
}
