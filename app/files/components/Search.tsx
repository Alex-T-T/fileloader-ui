
'use client'
import { suggestionApi } from "@/app/helpers/api/suggestionsApi";
import {  useState } from "react";
import Autosuggest, {ChangeEvent, SuggestionsFetchRequestedParams } from 'react-autosuggest';

type SearchProps = {
    onSearch: (query: string) => void;
};

type Suggestion = {
    name: string;
};

export default function Search({ onSearch }: SearchProps) {

    const [query, setQuery] = useState('');

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setQuery(event.target.value);
    // };

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     onSearch(query);
    // };

    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    const handleSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
        suggestionApi.getSuggestions(value)
            .then(data => setSuggestions(data))
            .catch(error => console.error(error));
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleInputChange = (event: React.FormEvent<HTMLElement>, { newValue }: ChangeEvent) => {
        setQuery(newValue);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(query);
    };

    const getSuggestionValue = (suggestion: Suggestion ) => suggestion.name;

    const renderSuggestion = (suggestion: Suggestion, { isHighlighted }: { isHighlighted: boolean }) => (
        <div className={`p-2 cursor-pointer text-white ${isHighlighted ? 'bg-rose' : ''}`}>
            {suggestion.name}
        </div>
    );


    return (
        <section className="mb-8 w-full">
            <form onSubmit={handleSubmit} className="w-full rounded-[40px] flex flex-row flex-grow-0 items-center  gap-3 p-3 backdrop-blur-[10px] bg-secondary">
    

<Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                    onSuggestionsClearRequested={handleSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    containerProps={{className: 'w-full'}}
                    renderSuggestion={renderSuggestion}
                    inputProps={{
                        placeholder: "Search for...",
                        value: query,
                        onChange: handleInputChange,
                        className: "bg-home p-3 rounded-[29px] placeholder-white placeholder:text-sm w-full text-white focus:outline-none focus:border focus:border-rose text-sm",
                    }}
                    theme={{
                        container: 'relative',
                        suggestionsContainer: 'absolute z-10 bg-secondary rounded-lg mt-1 w-full',
                        suggestionsList: 'list-none p-0 m-0',
                        suggestion: 'p-2 cursor-pointer',
                        suggestionHighlighted: 'p-2 cursor-pointer bg-rose'
                    }}
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
