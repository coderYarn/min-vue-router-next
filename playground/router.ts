import { createRouter, createBrowserHistory } from "../src";
import About from "./views/About.vue";
import Home from "./views/Home.vue";

import Parent from "./views/Parent.vue";
import Child from "./views/Child.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/parent",
    name: "Parent",
    component: Parent,
    children: [
      {
        path: "/parent/child",
        name: "Child",
        component: Child,
      },
    ],
  },
];

const router = createRouter({
  history: createBrowserHistory(),
  routes,
});

export default router;
