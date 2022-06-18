import Home from "./Pages/Home/Home";
import List from "./Pages/list/List";
import TrackList from "./Pages/list/trackList";
import Single from "./Pages/single/Single";
import { albumInputs, artistInputs, userInputs } from "./formSource";
import New from "./Pages/new/New";
import EditArtistForm from "./Pages/new/EditArtistForm";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useContext } from "react";
import { DarkModeContext } from "./Context/darkModeContext";
import NewAlbum from "./Pages/new/newAlbum";
import NewAlbumOnly from "./Pages/new/addAlbum";
import AlbumView from "./Pages/View/albumView";
import NewAlbumOnlyEdit from "./Pages/edit/albumEdit";
import TrackAdd from "./Pages/new/trackAdd";
import TrackEdit from "./Pages/edit/trackEdit";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />

            <Route exact path="/album">
              <Route index element={<List />} />
              <Route path=":albumId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={albumInputs} title="Add album" />}
              />
            </Route>

            <Route exact path="/albumAdd">
              <Route index element={<List />} />
              <Route path=":albumId" element={<Single />} />
              <Route
                path="new"
                element={
                  <NewAlbumOnly inputs={albumInputs} title="Add album" />
                }
              />
            </Route>
            <Route exact path="/addAlbum">
              <Route index element={<List />} />
              <Route path=":albumId" element={<Single />} />
              <Route
                path="new"
                element={<NewAlbum inputs={albumInputs} title="Add album" />}
              />
            </Route>
            <Route path="/albumEdit">
              <Route index element={<List />} />
              <Route path=":albumId" element={<NewAlbumOnlyEdit />} />
            </Route>
            <Route path="/trackAdd">
              <Route index element={<List />} />
              <Route path="add" element={<TrackAdd />} />
            </Route>
            <Route path="/trackEdit">
              <Route index element={<List />} />
              <Route path=":trackId" element={<TrackEdit />} />
            </Route>
            <Route exact path="/albumView">
              <Route index element={<List />} />
              <Route path="view" element={<AlbumView />} />
            </Route>
          </Route>
          <Route path="users">
            <Route index element={<List />} />
            <Route path=":idx" element={<EditArtistForm />} />
            <Route
              path="new"
              element={
                <New
                  inputs={artistInputs}
                  filetag="Profile"
                  title="Add New User"
                />
              }
            />
          </Route>

          <Route path="track">
            <Route index element={<TrackList />} />
            <Route path=":trackId" element={<Single />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
