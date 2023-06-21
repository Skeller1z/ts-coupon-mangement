import React, { useState, useEffect, Suspense } from "react";

import Loading from "./Component/MainPage/Loading";
import Router from "./routes/routes";

interface DataState {
  firstname: string;
  lastname: string;
}

function App(props) {
  useEffect(() => {
    /* caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    }); */
  }, []);

  return (
    <>
      <div>
        <Suspense fallback={<Loading />}>
          <Router />
        </Suspense>
      </div>
    </>
  );
}
export default App;
