import { useState, useEffect } from "react";

const isIntersectionObserverSupported =
  "IntersectionObserver" in window &&
  "IntersectionObserverEntry" in window &&
  "intersectionRatio" in window.IntersectionObserverEntry.prototype;

// Credits: https://billyjacoby.com/intersectionobserver-api-with-react-hooks/
export const useIntersectionObserver = (
  ref,
  { threshold = 0, root = null, rootMargin = "0%" }
) => {
  const [state, setState] = useState({
    inView: false,
    triggered: false,
    entry: undefined
  });

  let observer = null;

  if (isIntersectionObserverSupported) {
    observer = new IntersectionObserver(
      (entries, observerInstance) => {
        // const [{ intersectionRatio, isIntersecting }] = entries;

        // Check to see if the element is intersecting
        if (entries[0].intersectionRatio > 0) {
          // If element is intersectin, update the state. Set triggered to true, as to not re-observe the element.
          setState({
            inView: true,
            triggered: true,
            entry: observerInstance
          });

          // Unobserve the element
          observerInstance.unobserve(ref.current);
        }
      },
      {
        threshold,
        root,
        rootMargin
      }
    );
  }

  useEffect(() => {
    if (isIntersectionObserverSupported && observer) {
      // Check that the element exists, and has not already been triggered
      if (ref.current && !state.triggered) {
        observer.observe(ref.current);
      }
    } else {
      // IntersectionObserver is not supported, so we report that it is in view immediately.
      setState({
        inView: true,
        triggered: true,
        entry: undefined
      });
    }
  }, [observer, ref, state.triggered]);

  return [state.inView, state.entry];
};
