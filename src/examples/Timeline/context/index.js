import { createContext, useContext } from "react";

const Timeline = createContext();

// eslint-disable-next-line react/prop-types
function TimelineProvider({ children, value }) {
  return <Timeline.Provider value={value}>{children}</Timeline.Provider>;
}

function useTimeline() {
  return useContext(Timeline);
}

export { TimelineProvider, useTimeline };
