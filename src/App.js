import "./App.css";
import { Auth } from "./components/auth";
import { db, storage, auth } from "./config/firebase";
import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTtile, setNewMovieTtile] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(true);

  const [updatedTitle, setUpdatedTitle] = useState("");

  const [fileUpload, setFileUpload] = useState(null);

  const collection_name = "movies";
  const moviesCollectionRef = collection(db, collection_name);
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMovieList(filteredData);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTtile,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (e) {
      console.log(e);
    }
  };
  const deleteMovie = async (id) => {
    try {
      const delDoc = doc(db, "movies", id);
      await deleteDoc(delDoc);
    } catch (E) {
      console.log(E);
    }
  };
  const updateMovie = async (id) => {
    try {
      const updateMovie = doc(db, "movies", id);
      await updateDoc(updateMovie, { title: updatedTitle });
    } catch (E) {
      console.log(E);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="App">
      <Auth />
      <div>
        <input
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTtile(e.target.value)}
        ></input>
        <input
          placeholder="Release Date..."
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        ></input>
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        ></input>
        <label>Oscar Received Or Not</label>
        <button onClick={onSubmitMovie}>submit movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input
              placeholder="update movie"
              defaultValue={movie.title}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />

            <button onClick={() => updateMovie(movie.id)}>Update</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>upload file</button>
      </div>
    </div>
  );
}

export default App;
