import "./index.css";
import Footer from "./components/Footer.jsx";
import DiaryEntries from "./components/DiaryEntry.jsx";

function App() {
  return (  
  <div className="bg-slate-200">
    <DiaryEntry />
    <Footer />
  </div>
  );
}

export default App;
