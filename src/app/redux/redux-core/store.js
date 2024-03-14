import { applyMiddleware, createStore } from 'redux';
import allReducers from './reducer';
import { thunk } from 'redux-thunk'; // Support for action return function instead of object (async action)
import { persistStore, persistReducer } from 'redux-persist'; // Support for saving state after refresh (save to local storage)
import storage from 'redux-persist/lib/storage'; // local storage
import { composeWithDevTools } from 'redux-devtools-extension'; // Support for Redux DevTools

/* const middleware = (store) => {
  return (next) => {
    return (action) => {
      return next(action);
    };
  };
}; 
OR
*/
// Phải đi qua middle ware trước
const customMiddleware = (store) => (next) => (action) => {
  console.log({ store, next, action });
  if (action.payload === 2) {
    next({ type: action.type, payload: 1 });
    return;
  }
  next(action);
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter'], // only counter will be persisted (saved to local storage)
  // blacklist (nguoc lai)
};

const persistedReducer = persistReducer(persistConfig, allReducers);

// Redux DevTools
const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

//3 tham số: reducer, initValue, enhance (middleware) (Cũ rồi -  giờ còn 2 tham số như dưới thooi)
//neu truyen 2 tham so: reducer, enhance
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk, customMiddleware))
);

export const persistor = persistStore(store);
