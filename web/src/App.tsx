import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/home";
import RedirectPage from "./pages/RedirectPage";
import { AlertProvider } from "./components/alert/alertContext";

function App() {

  return (
    <>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":slug" element={<RedirectPage />} />
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </>
  )
}

export default App
