import * as React from "react";
import { render } from "react-dom";
import { observable } from "mobx";
import { observer } from "mobx-react";

const root =
  document.querySelector("main") ||
  document.body.appendChild(document.createElement("main"));

const Example = React.lazy(() => import("./example"));

const store = observable({
  test: 1,
  loading: false,
  /** @type {import('./thing').Thing} */
  data: null,
  showExample: false,

  loadExample: async () => {
    store.loading = true;
    store.data = (await import('./thing')).Thing;
    store.loading = false;
  },
});

const Application = observer(() => (
  <div>
    This is the application
    <div>test: {store.test}</div>
    <h2>With promise</h2>
    <div>
      <button onClick={() => (store.loadExample())}>Test</button>
      {
        store.loading ? 'Loading...' : JSON.stringify(store.data)
      }
    </div>
    <h2>With React</h2>
    <div>
      <button onClick={() => (store.showExample = true)}>Test</button>
      {store.showExample ? (
        <React.Suspense fallback="I am loading...">
          <Example />
        </React.Suspense>
      ) : null}
    </div>
  </div>
));

render(<Application />, root);
