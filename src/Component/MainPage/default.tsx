import React, { useState } from "react";
export default function Default() {
  const [viewWidth, setviewWidth] = useState<number>(null);
  const resize = () => {
    if (window.innerWidth < 576) {
      setviewWidth(576);
    }
    if (window.innerWidth >= 576) {
    }
    if (window.innerWidth >= 768) {
    }
    if (window.innerWidth >= 992) {
      setviewWidth(992);
    }
    if (window.innerWidth >= 1200) {
    }
    if (window.innerWidth >= 1400) {
    }
  };
  React.useEffect(() => {
    resize();
  }, [viewWidth]);
  return (
    <div className="App-header">
      <h5>Default</h5>
    </div>
  );
}
