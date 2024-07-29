import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24 bg-home">
            <Link
                href="/files"
             className="flex items-center justify-center w-[176px] p-3 rounded-[30px] border border-rose text-rose text-base hover:bg-button-hover hover:cursor-custom-cursor active:bg-rose active:text-white transition-all duration-300 ease-in-out"

            >
                Start
            </Link>
        </main>
    );
}
