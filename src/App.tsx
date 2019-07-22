import React from "react";
import "./App.css";
import Header from "./components/Header";
import VideoParent from "./components/VideoParent";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header>Video Player</Header>
      <section
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          height: "100%"
        }}
      >
        <VideoParent />
      </section>
    </div>
  );
};

export default App;
