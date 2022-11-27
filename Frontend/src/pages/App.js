import Landing from './Landing';
import Content from './Content.js'
import Register from './Register.js'
import Error from "./Error.js";
import Choice from "./Choice"
import {Message, Overview, Records, Profile} from  "./Body/index"
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="choice" element={<Choice/>} />
        <Route path=":username" element={<Content />}>
          <Route index element={<Profile />} />
          <Route path="records" element={<Records />} />
          <Route path="overview" element={<Overview />} />
          <Route path="message" element={<Message />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
