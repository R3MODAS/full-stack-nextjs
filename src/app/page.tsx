import Links from "./components/Links";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-center text-3xl font-bold my-5">Welcome to Chai and Nextjs</h1>
      <Links />
    </div>
  );
}
