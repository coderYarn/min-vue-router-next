import { RouterView } from "./Components/router-view";
import { RouterLink } from "./Components/router-link";
import { createMatcher } from "./create-matcher";
import { shallowRef, unref, computed } from "vue";
import { START } from "./utils/route";

export const historyKey = Symbol("historyKey");
export const routesKey = Symbol("routesKey");

export function createRouter(options: any): any {
  const matcher = createMatcher(options.routes); //路由规则

  const routerHistory = options.history; //history
  const currentRoute = shallowRef(START);
  
  const router: any = {
    currentRoute,
    ...matcher,
    ...routerHistory,

    install: (app: any) => {
      const reactiveRoute = {};
      for (const key in START) {
        // @ts-expect-error: the key matches
        reactiveRoute[key] = computed(() => currentRoute.value[key]);
      }
      
      routerHistory.listen((active: any) => {
        currentRoute.value = router.match(active.location.pathname);
      });
      
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);

      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute),
      });
      app.provide("matcher", matcher);
      app.provide(historyKey, options.history);

      app.provide(routesKey, currentRoute);
    },
  };

  return router;
}
