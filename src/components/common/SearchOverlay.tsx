import { useEffect, useRef, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SearchOverlay = ({ open, onClose }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const pagefindRef = useRef<any>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  //   load pagefind once
  useEffect(() => {
    if (!open || pagefindRef.current) return;

    const pf = (window as any).pagefind;
    if (!pf) return;

    pf.options({
      excerptLength: 10,
      highlightParam: "highlight",
    });

    pf.init();
    pagefindRef.current = pf;

    console.log("pagefind ready");
  }, [open]);

  //   focus input on open
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  //   search logic (debounced)
  useEffect(() => {
    if (!query.trim() || !pagefindRef.current) {
      setResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);

    const timeout = setTimeout(async () => {
      const search = await pagefindRef.current.search(query);
      const data = await Promise.all(
        search.results.slice(0, 5).map((r: any) => r.data()),
      );

      setResults(data);
      setSearching(false);
    }, 300);

    // log the results value
    console.log(results);

    return () => clearTimeout(timeout);
  }, [query]);

  if (!open) return null;

  return (
    <>
      {/* overlay */}
      <div className="fixed inset-0 z-50 bg-gray-950/90" onClick={onClose} />

      {/* search container */}
      <div className="fixed top-[10%] left-1/2 z-[100] w-[90%] -translate-x-1/2 md:w-xl">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search article"
          className="text-secondary-emphasize bg-neutral w-full rounded-md p-3"
        />

        <ul className="spacing-y-dense bg-neutral mt-4 max-h-[300px] overflow-y-auto rounded-md p-3">
          {searching && <li className="opacity-60">Searching…</li>}

          {results.map((r) => (
            <li key={r.url} className="bg-tertiary-default rounded-md p-3">
              <a href={r.url} onClick={onClose}>
                <h3 className="mb-2 text-base">{r.meta.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: r.excerpt }} />
              </a>
            </li>
          ))}

          {query && !searching && results.length === 0 && (
            <li className="p-3 text-sm opacity-60">No results</li>
          )}
        </ul>
      </div>
    </>
  );
};
