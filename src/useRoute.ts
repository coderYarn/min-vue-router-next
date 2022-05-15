import { inject } from "vue";
import { routesKey } from "./routes";

export function useRoute() {
  const currentRoute = inject(routesKey);

  return currentRoute;
}
