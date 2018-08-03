import React from "react";

const style = {
  background: `url(${process.env.PUBLIC_URL}/img/main-bg.jpg)`
};

const Main = () => {
  return (
    <main className="main-cover" style={style}>
      <div className="search-container">
        <div className="content-area">
          <h1 className="main-title">
            Book unique homes <br />and experiences all over the world.
          </h1>
          <div className="form-container">
            <form>
              <input
                className="search-box"
                type="text"
                placeholder="Try New York"
              />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
