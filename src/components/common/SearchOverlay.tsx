import { useEffect, useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

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
  const [hasSearched, setHasSearched] = useState(false);

  //   load pagefind once
  useEffect(() => {
    if (!open || pagefindRef.current) return;

    const pf = (window as any).pagefind;
    if (!pf) return;

    pf.options({
      excerptLength: 20,
    });

    pf.init();
    pagefindRef.current = pf;
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
      setHasSearched(false);
      return;
    }

    setSearching(true);
    setHasSearched(false);
    setResults([]);

    const timeout = setTimeout(async () => {
      const search = await pagefindRef.current.search(query);

      const data = await Promise.all(
        search.results.slice(0, 5).map((r: any) => r.data()),
      );

      const searchResults = Object.values(
        data.reduce((acc, { excerpt, meta, sub_results, url }) => {
          const category =
            url.replace(/^\/+|\/+$/g, "").split("/")[0] === "blog"
              ? "general"
              : url.replace(/^\/+|\/+$/g, "").split("/")[0];

          if (!acc[category]) {
            acc[category] = {
              category,
              data: [],
            };
          }

          acc[category].data.push({ excerpt, meta, sub_results, url });

          return acc;
        }, {}),
      );

      setResults(searchResults);
      setSearching(false);
      setHasSearched(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  if (!open) return null;

  return (
    <>
      {/* overlay */}
      <div className="fixed inset-0 z-50 bg-gray-950/90" onClick={onClose} />

      {/* search container */}
      <div className="fixed top-[10%] left-1/2 z-[100] w-[90%] -translate-x-1/2 md:w-[758px]">
        <div className="bg-modal-default flex items-center gap-4 rounded-md p-3">
          <label htmlFor="search-input" className="text-secondary-default">
            <RiSearchLine />
          </label>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            id="search-input"
            placeholder="Search article"
            className="text-secondary-emphasize w-full focus:ring-0 focus:outline-none"
          />
          <button onClick={onClose}>
            <small className="border-tertiary-emphasize text-secondary-default rounded-sm border p-1">
              Esc
            </small>
          </button>
        </div>

        {query && (
          <div className="mt-4 max-h-[500px] overflow-hidden rounded-md md:max-h-[400px]">
            <ul className="spacing-y-looser bg-modal-default flex max-h-[inherit] flex-col overflow-y-auto p-3">
              {searching && (
                <li className="text-secondary-default p-3">
                  Searching for "
                  <span className="text-secondary-emphasize">{query}</span>"...
                </li>
              )}

              {!searching &&
                results.map((result) => (
                  <li
                    key={result.category}
                    className="spacing-y-dense flex flex-col"
                  >
                    <h3 className="text-xl capitalize">{result.category}</h3>
                    <ul className="spacing-y-denser flex flex-col">
                      {result.data.map((d: any) => (
                        <li
                          key={d.url}
                          className="spacing-y-denser flex flex-col"
                        >
                          <a href={d.url}>
                            <h4 className="bg-modal-emphasize rounded-md p-4 text-lg">
                              {d.meta.title}
                            </h4>
                          </a>
                          <div className="pl-2">
                            <ul className="spacing-y-denser border-l-tertiary-emphasize flex flex-col border-l pl-4">
                              {d.sub_results.map((sub_result: any) => (
                                <li
                                  key={sub_result.url}
                                  className="bg-modal-emphasize rounded-md p-4"
                                >
                                  <a href={sub_result.url}>
                                    <h5 className="text-secondary-emphasize font-bold">
                                      {sub_result.title}
                                    </h5>
                                    <p
                                      className="mt-2"
                                      dangerouslySetInnerHTML={{
                                        __html: sub_result.excerpt,
                                      }}
                                    />
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}

              {/* {!searching &&
                results.map((r) => (
                  <li
                    key={r.url}
                    className="bg-tertiary-default rounded-md p-3"
                  >
                    <a href={r.url} onClick={onClose}>
                      <h3 className="mb-2 text-base">{r.meta.title}</h3>
                      <p dangerouslySetInnerHTML={{ __html: r.excerpt }} />
                    </a>
                  </li>
                ))} */}

              {/* {!searching &&
                results.map((result) => (
                  <li
                    key={result.url}
                    className="spacing-y-denser flex flex-col"
                  >
                    <a
                      href={result.url}
                      className="inline-block rounded-md bg-modal-emphasize p-4"
                    >
                      <h3 className="text-base">{result.meta.title}</h3>
                    </a>
                    <div className="pl-2">
                      <ul className="spacing-y-denser border-l-tertiary-emphasize flex flex-col border-l">
                        {result.sub_results.map((sub_result: any) => (
                          <li key={sub_result.url} className="ml-4">
                            <a
                              href={sub_result.url}
                              className="inline-block rounded-md bg-modal-emphasize p-4"
                            >
                              <h4 className="text-base">{sub_result.title}</h4>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: sub_result.excerpt,
                                }}
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))} */}

              {hasSearched && !searching && results.length === 0 && (
                <li className="text-secondary-default p-3">
                  No results for "
                  <span className="text-secondary-emphasize">{query}</span>"
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
