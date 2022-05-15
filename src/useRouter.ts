import { inject } from "vue";
import { historyKey } from "./routes";

export function useRouter() {
  const router = inject(historyKey);
  return router;
}
