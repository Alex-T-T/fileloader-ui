import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24 bg-home">
            <Link
                href="/files"
                className="bg-white w-20 text-black rounded text-center"
            >
                Start
            </Link>
        </main>
    );
}
