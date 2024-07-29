
'use client'
import { suggestionApi } from "@/app/helpers/api/suggestionsApi";
import {  useCallback, useState } from "react";
import Autosuggest, {ChangeEvent, SuggestionsFetchRequestedParams } from 'react-autosuggest';
import debounce from 'lodash/debounce';

type SearchProps = {
    onSearch: (query: string) => void;
};

type Suggestion = {
    name: string;
};

export default function Search({ onSearch }: SearchProps) {

    const [query, setQuery] = useState('');

    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    const debouncedFetchSuggestions = useCallback(
        debounce((value: string) => {
            suggestionApi.getSuggestions(value)
                .then(data => setSuggestions(data.slice(0, 5)))
                .catch(error => console.error(error));
        }, 300),
        []
    );

    const handleSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
        debouncedFetchSuggestions(value);
    };
    

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleInputChange =  (event: React.FormEvent<HTMLElement>, { newValue }: ChangeEvent) => {
        setQuery(newValue);
        debouncedFetchSuggestions(newValue); 
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(query);
    };

    const getSuggestionValue = (suggestion: Suggestion ) => suggestion.name;

    const renderSuggestion = (suggestion: Suggestion, { isHighlighted }: { isHighlighted: boolean }) => (
        <div className={`p-2 cursor-custom-cursor  z-50 text-white ${isHighlighted ? 'bg-rose' : ''}`}>
            {suggestion.name}
        </div>
    );


    return (
        <section className="mb-8 w-full relative">
            <form onSubmit={handleSubmit} className="w-full rounded-[40px] flex flex-row flex-grow-0 items-center  gap-3 p-3 backdrop-blur-[10px] bg-secondary">
    

<Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                    onSuggestionsClearRequested={handleSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    containerProps={{className: 'w-full z-50' }}
                    renderSuggestion={renderSuggestion}
                    inputProps={{
                        placeholder: "Search for...",
                        value: query,
                        onChange: handleInputChange,
                        className: "bg-home z-50 p-3 rounded-[29px] placeholder-white placeholder:text-sm w-full text-white focus:outline-none focus:border focus:border-rose text-sm",
                    }}
                    theme={{
                        container: 'relative z-50 ',
                        suggestionsContainer: ' absolute z-50 bg-secondary rounded-lg mt-1 ',
                        suggestionsList: 'list-none z-50 p-0 m-0 cursor-custom-cursor bg-secondary',
                        suggestion: 'p-2 z-50 cursor-custom-cursor',
                        suggestionHighlighted: 'p-2 cursor-custom-cursor bg-rose z-50',
                        containerOpen: 'z-50'
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
