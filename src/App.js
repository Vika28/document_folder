import styles from './app.module.scss';

import {
  Routes,
  Route
} from "react-router-dom";
import DocumentPage from "./components/DocumentPage/DocumentPage";
import MainPage from "./components/MainPage/MainPage";

function App() {
  return (
    <div className={`${styles.app}`}>



      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/:id" element={<DocumentPage />}></Route>
      </Routes>
      {/*<Router>*/}
      {/*  <div>*/}
      {/*    <ul>*/}
      {/*      <li>*/}
      {/*        <Link to="/">Home</Link>*/}
      {/*      </li>*/}
      {/*      <li>*/}
      {/*        <Link to="/documentPage">DocumentPage</Link>*/}
      {/*      </li>*/}
      {/*    </ul>*/}

      {/*    <Routes>*/}
      {/*      <Route path='/documentPage' element={<DocumentPage/>} />*/}

      {/*      <Route path='/' element={<MainPage/>} />*/}

      {/*    </Routes>*/}
      {/*  </div>*/}
      {/*</Router>*/}
      {/*<Router>*/}
      {/*  <div>*/}
      {/*    <nav>*/}
      {/*      <ul>*/}
      {/*        <li>*/}
      {/*          <Link to="/">MainPage</Link>*/}
      {/*        </li>*/}
      {/*        <li>*/}
      {/*          <Link to="/documentPage">Document Page</Link>*/}
      {/*        </li>*/}
      {/*      </ul>*/}
      {/*    </nav>*/}

      {/*    <Routes>*/}
      {/*      <Route path='/' element={<MainPage/>} />*/}
      {/*      <Route path='/documentPage' element={<DocumentPage/>} />*/}
      {/*    </Routes>*/}
      {/*  </div>*/}
      {/*</Router>*/}
    </div>
  );
}

export default App;
