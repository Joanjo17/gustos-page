import { Routes, Route } from "react-router";
import { Suspense, lazy } from "react";
import { Header } from "./components/Header.jsx";
import { LoadingPage } from "./page/LoadingPage.jsx";
import { useAuth } from "./context/AuthContext.jsx";

const Home = lazy(() => import("./page/Home.jsx"));
const NotFoundPage = lazy(() => import("./page/NotFoundPage.jsx"));
const LikesPage = lazy(() => import("./page/LikesPage.jsx"));
const OldLikesPage = lazy(() => import("./page/OldLikesPage.jsx"));
const Login = lazy(() => import("./page/Login.jsx"));
const Register = lazy(() => import("./page/Register.jsx"));

function App() {
  // Esperamos a que haga la comprobación antes de renderizar toda la app
  const { loadingAuth } = useAuth();
  if (loadingAuth) {
    return <LoadingPage />;
  }
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/old" element={<OldLikesPage />} />
            <Route path="/u/:userOwner" element={<LikesPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Suspense>
    </>
  );
}

export default App;
