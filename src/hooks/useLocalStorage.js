"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook that mirrors the useState API but persists the value
 * to localStorage. Handles SSR gracefully and falls back to the
 * initial value if reading/writing localStorage fails.
 *
 * @param {string} key - localStorage key
 * @param {*} initialValue - Default value when nothing is stored
 * @returns {[*, Function]} [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  // Lazy initializer — read from localStorage only on first render
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(
        `[useLocalStorage] Error reading key "${key}" from localStorage:`,
        error
      );
      return initialValue;
    }
  });

  // Persist to localStorage whenever storedValue or key changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(
        `[useLocalStorage] Error writing key "${key}" to localStorage:`,
        error
      );
    }
  }, [key, storedValue]);

  // Wrap setter so callers can pass a value or an updater function,
  // exactly like useState
  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const nextValue =
          typeof value === "function" ? value(prev) : value;
        return nextValue;
      });
    },
    []
  );

  return [storedValue, setValue];
}

export default useLocalStorage;
