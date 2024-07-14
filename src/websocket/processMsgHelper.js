/** @format */

import { store } from "../store/reduxStore";

export const processMsgHelper = (message, isInit) => {
  try {
    if (message) {
      var stockInfos = JSON.parse(message);

      if (stockInfos && stockInfos.Symbol) {
        const oldSymbols = store.getState().gSymbol.symbols;
        var newSymbols = [...oldSymbols];

        var idx = newSymbols.findIndex((e) => e.Symbol == stockInfos.Symbol);

        if (idx < 0) {
          newSymbols.push(stockInfos);
        } else {
          newSymbols[idx] = stockInfos;
        }

        store.dispatch({
          type: "STOCK_SET_DATA",
          payload: newSymbols,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
