import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import MyPhones from "./screens/MyPhones/MyPhones";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreatePhone from "./screens/CreatePhone/CreatePhone";
import SinglePhone from "./screens/SinglePhone/SinglePhone";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
const App = () => {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/createphone" component={CreatePhone} />
        <Route path="/phone/:id" component={SinglePhone} />
        <Route
          path="/myphones"
          component={() => <MyPhones search={search} />}
        />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
