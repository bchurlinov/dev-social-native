import React from 'react';
import { Provider } from "react-redux";
import { ApplicationProvider } from "@ui-kitten/components";
import { mapping, light as lightTheme } from '@eva-design/eva';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));
import Root from "./components/Root";

const App = () => {
  return (
    <Provider store={store}>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Root />
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
