
export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Release Year: </span>
          <span>{movie.releaseYear}</span>
          </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre.name}</span>
        </div>
        <div>
          <span>Genre Description: </span>
          <span>{movie.genre.description}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director.name}</span>
        </div>
        <div>
          <span>Bio: </span>
          <span>{movie.director.bio}</span>
        </div>
        <div>  
           <span>Birth Year: </span>
           <span>{movie.director.birthYear}</span>
        </div>
        <div>  
           <span>Death Year: </span>
           <span>{movie.director.deathYear}</span>
        </div>
          <div>
          <span>Featured: </span>
          <span>{movie.featured}</span>
          </div>
          <div>
            <span>Actors: </span>
            <span>{movie.actors}</span>
          </div>
          <button onClick={onBackClick}>Back</button>
      </div>
    );
  };