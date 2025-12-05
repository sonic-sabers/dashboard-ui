import * as React from "react";

/**
 * Creates a strict context that throws an error if used outside of its provider.
 * Useful for ensuring components are used within the correct context hierarchy.
 *
 * @param name - The name of the context for error messages
 * @returns A tuple of [Provider component, useContext hook]
 *
 * @example
 * ```tsx
 * const [MyContextProvider, useMyContext] = getStrictContext<MyContextType>('MyContext');
 *
 * function MyComponent() {
 *   const value = useMyContext(); // Throws if not inside MyContextProvider
 *   return <div>{value}</div>;
 * }
 * ```
 */
export function getStrictContext<T>(name: string) {
  const Context = React.createContext<T | undefined>(undefined);

  function useContext() {
    const context = React.useContext(Context);
    if (context === undefined) {
      throw new Error(`use${name} must be used within ${name}Provider`);
    }
    return context;
  }

  const Provider = ({
    children,
    value,
  }: {
    children: React.ReactNode;
    value: T;
  }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  return [Provider, useContext] as const;
}
