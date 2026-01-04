import React from "react";
import Navbar from "./components/Navbar";
import PassInput from "./components/PassInput";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="grow">
        <PassInput />
      </main>

      <Footer />
    </div>
  );
};

export default App;
