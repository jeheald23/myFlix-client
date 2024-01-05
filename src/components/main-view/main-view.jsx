import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
const [movies, setMovies] = useState([
    { id: 1, 
    title: "Gattaca",
    description:"A genetically inferior man assumes the identity of a superior one in order to pursue his lifelong dream of space travel.",
    genre:{name:"Science Fiction",
    description:"Science fiction (sometimes shortened to SF or sci-fi) is a genre of speculative fiction, which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life."},
    releaseYear:"1997",
    "director":{name:"Andrew Niccol",
    bio:"Andrew Niccol is a New Zealand screenwriter, producer, and director. He wrote and directed Gattaca (1997), Simone (2002), Lord of War (2005), In Time (2011), The Host (2013), and Good Kill (2014).He wrote and co-produced The Truman Show, which earned him a nomination for the Academy Award for Best Original Screenplay and won him the BAFTA Award in the same category. His films tend to explore social, cultural and political issues, as well as artificial realities, simulations and the male gaze.",
    birthYear:"1964"},
    image: "/img/gattaca.png",
    featured:false,
    actors:["Ethan Hawke,", " ", "Uma Thurman,", " ", "Jude Law"]
},
    { id: 2, 
    title: "Little Women",
    description:"Jo March reflects back and forth on her life, telling the beloved story of the March sisters - four young women, each determined to live life on her own terms.",
    genre:{name:"Drama",
    description:"In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."},
    releaseYear: "2019",
    director:{name:"Greta Gerwig",
    bio:"Greta Celeste Gerwig is an American actress, writer, and director. Initially known for working on mumblecore films, she has since expanded from acting in and co-writing independent films to directing major studio films. Gerwig was included in the annual Time 100 list of the most influential people in the world in 2018.",
    birthYear:1983},
    image:"/img/littlewomen.png",
    featured:false,
    actors:["Saoirse Ronan,", " ", "Emma Watson,", " ", "Florence Pugh,"," ", "Laura Dern"]
},
    { id: 3, 
    title:"Mulholland Drive",
    description:"After a car wreck on the winding Mulholland Drive renders a woman amnesiac, she and a perky Hollywood-hopeful search for clues and answers across Los Angeles in a twisting venture beyond dreams and reality.",
    genre:{name:"Thriller",
    description:"Thriller is a genre of fiction with numerous, often overlapping, subgenres, including crime, horror, and detective fiction. Thrillers are characterized and defined by the moods they elicit, giving their audiences heightened feelings of suspense, excitement, surprise, anticipation and anxiety."},
    releaseYear:"2001",
    director: {name: "David Lynch",
    bio:"David Keith Lynch is an American filmmaker, painter, visual artist, musician and actor. Lynch has received critical acclaim for his films, which are often distinguished by their surrealist qualities. He has received numerous accolades, including the Golden Lion in 2006 and an Honorary Academy Award in 2019.",
    birthYear:"1946"},
    image:"/img/mullhollanddrive.png",
    actors: ["Naomi Watts,", " ", "Laura Harring"],
    },
]);

const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};