import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Movie {
  movie: {
    id: string;
    category: string;
    pubDate: Date;
    title: string;
    overview: string;
    releaseDate: string;
    genres: Array<string>;
    poster: string;
    directors: Array<string>;
    casts: Array<string>;
  };
}

const MovieList = ({ movie }: Movie) => {
  const movieItemRef = useRef<HTMLLIElement | null>(null);
  const moviePosterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!movieItemRef.current || !moviePosterRef.current) return;

    const movieItemEl = movieItemRef.current;
    const moviePosterEl = moviePosterRef.current;

    gsap.set(moviePosterEl, { xPercent: -50, yPercent: -50 });

    // Smooth quickTo setters
    const xTo = gsap.quickTo(moviePosterEl, "left", {
      duration: 0.6,
      ease: "power3",
    });

    const yTo = gsap.quickTo(moviePosterEl, "top", {
      duration: 0.6,
      ease: "power3",
    });

    const animation = gsap.to(moviePosterEl, {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "ease-in-out",
      paused: true,
      immediateRender: false,
    });

    const handleEnter = () => animation.play();
    const handleLeave = () => animation.reverse();

    const handleMove = (e: MouseEvent) => {
      xTo(e.pageX + 75);
      yTo(e.pageY - 100);
    };

    movieItemEl.addEventListener("mouseenter", handleEnter);
    movieItemEl.addEventListener("mouseleave", handleLeave);
    movieItemEl.addEventListener("mousemove", handleMove);

    return () => {
      movieItemEl.removeEventListener("mouseenter", handleEnter);
      movieItemEl.removeEventListener("mouseleave", handleLeave);
      movieItemEl.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <li ref={movieItemRef} id="movie-item" data-genre={movie.genres.join(", ")}>
      <a
        href={`/movies/${movie.id}`}
        className="spacing-y-densest group flex flex-col md:grid md:grid-cols-12"
      >
        <time
          dateTime={movie.pubDate.toLocaleDateString()}
          className="group-hover:text-primary col-span-3 transition-all duration-300 ease-in-out md:col-span-2"
        >
          {movie.pubDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
        <div className="spacing-y-densest flex flex-col md:col-span-10">
          <p className="group-hover:text-primary transition-all duration-300 ease-in-out">
            {movie.genres.map(String).join(", ")}
          </p>
          <h2 className="group-hover:text-primary text-base leading-[1.6] transition-all duration-300 ease-in-out">
            {movie.title} (
            <time
              dateTime={new Date(movie.releaseDate).toLocaleDateString()}
              className="text-secondary-emphasize group-hover:text-primary transition-all duration-300 ease-in-out"
            >
              {new Date(movie.releaseDate).getFullYear()}
            </time>
            )
          </h2>
          <div
            ref={moviePosterRef}
            id="movie-poster"
            style={{
              backgroundImage: `url("${movie.poster}")`,
              backgroundSize: "cover",
            }}
            className={`absolute z-20 hidden h-[150px] w-[100px] scale-[0.4] transform rounded opacity-0 md:block`}
          ></div>
        </div>
      </a>
    </li>
  );
};

export default MovieList;
