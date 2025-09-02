import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div>
      <Header />
      <div className="lg:mx-30 mx-10">
        <AppRoutes />
      </div>

      <Footer />
    </div>
  );
}

export default App;
