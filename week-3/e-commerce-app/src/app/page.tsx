import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-4 items-center p-24">
      <h1>Nextjs 13 e-commerce app demo</h1>
      <Link href={"/products"} className="text-blue-500 hover:underline">Products Page</Link>
    </main>
  );
}
