import { createContext, useContext, useReducer, useEffect } from "react";
import { masterReducer } from "../reducers/masterReducer.js";

const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(masterReducer, {}, () => {
    const saved = localStorage.getItem("stateRecord");
    return saved ? JSON.parse(saved) : { poultry: [], inventory: [], finance: [], production: [] };
  });

  useEffect(() => {
    localStorage.setItem("stateRecord", JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const usePoultry = () => {
  const context = useContext(AppContext);
  return { poultry: context.state.poultry, dispatchPoultry: context.dispatch };
};

export const useFinance = () => {
  const context = useContext(AppContext);
  return { finance: context.state.finance, dispatchFinance: context.dispatch };
};

export const useInventory = () => {
  const context = useContext(AppContext);
  return { inventory: context.state.inventory, dispatchInventory: context.dispatch };
};

export const useProduction = () => {
  const context = useContext(AppContext);
  return { production: context.state.production, dispatchProduction: context.dispatch };
};

export const useDashboardData = () => {
  const context = useContext(AppContext);
  return {
    poultry: context.state.poultry,
    finance: context.state.finance,
    inventory: context.state.inventory,
    production: context.state.production
  };
};