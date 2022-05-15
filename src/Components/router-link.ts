import { defineComponent, h, inject } from "vue";
import { historyKey } from "../routes";
export const RouterLink = defineComponent({
  name: "RouterLink",
  props: {
    to: {
      type: String,
    },
  },

  setup(props:any, { slots }:any) {
    const history: any = inject(historyKey);
    const handleLinkClick = (e: Event) => {
      e.preventDefault();
      history.push(props.to as any);
    };
    return () =>
      h(
        "a",
        {
          href: props.to,
          onClick: handleLinkClick,
        },
        slots.default && slots.default()
      );
  },
});
