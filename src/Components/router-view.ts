import {
  computed,
  defineComponent,
  h,
  inject,

  provide,
  ref,
} from "vue";
import { routesKey } from "../routes";

export const RouterView = defineComponent({
  name: "RouterView",
  props: {
    name: {
      type: String ,
      default: "default",
    },
    route: {
      type: Object,
    },
  },

  setup(props:any, { attrs, slots }:any) {
    const injectedRoute = inject(routesKey)!;

    const matcher: any = inject("matcher");

    const routeToDisplay = computed(() => props.route || injectedRoute.value);

    const depth = inject("viewDepthKey", 0);

    const matchedRouteRef = computed(() => {
      return matcher.match(routeToDisplay.value.path).matched[depth];
    });

    provide("viewDepthKey", depth + 1);
    provide("matchedRouteKey", matchedRouteRef);
    provide(routesKey, routeToDisplay);

    const viewRef = ref();

    return (proxy: any) => {
      const route = routeToDisplay.value;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components;
      console.log(proxy);

      if (!ViewComponent) {
        return normalizeSlot(slots.default, {
          Component: ViewComponent,
          route,
        });
      }

      const component = h(
        ViewComponent,
        Object.assign({}, [], attrs, {
          ref: viewRef,
        })
      );

      return (
        normalizeSlot(slots.default, { Component: component, route }) ||
        component
      );
    };
  },
});
function normalizeSlot(slot: any, data: any) {
  if (!slot) return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
