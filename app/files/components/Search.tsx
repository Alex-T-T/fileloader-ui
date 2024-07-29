
'use client'
import { useState } from "react";

type SearchProps = {
    onSearch: (query: string) => void;
};

export default function Search({ onSearch }: SearchProps) {

    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(query);
    };


    return (
        <section className="mb-8 w-full">
            <form onSubmit={handleSubmit} className="w-full rounded-[40px] flex flex-row flex-grow-0 items-center gap-3 p-3 backdrop-blur-[10px] bg-secondary">
                <input
                    placeholder="Search for..."
                    onChange={handleInputChange}
                    className="bg-home p-3 rounded-[29px] placeholder-white placeholder:text-sm w-full text-white focus:outline-none focus:border focus:border-rose text-sm"
                />
                <button
                    type="submit"
                    className="w-[176px] p-3 rounded-[30px] border border-rose text-rose text-base hover:bg-button-hover hover:cursor-custom-cursor active:bg-rose active:text-white transition-all duration-300 ease-in-out"
                >
                    Search
                </button>
            </form>
        </section>
    );
}
