import React, { useEffect, useState } from "react";

const StickyBar = ({ children, content }) => {
  const [isBottom, setIsBottom] = useState(true);

  useEffect(() => {
    // Remove the event listener since we want the bar to be fixed at the bottom
    return () => {};
  }, []);

  return (
    <>
      {/* Additional items at the bottom */}
      {isBottom && content && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            background: "whitesmoke",
            padding: "15px",
            zIndex: 1000,
          }}
        >
          {content}
        </div>
      )}
    </>
  );
};

export default StickyBar;
