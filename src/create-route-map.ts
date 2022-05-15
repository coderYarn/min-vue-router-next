

export interface RouterEecord{
  path: string,
  name:string,
  regex?:String,
  components?: any,
  component?: any,
  parent?:any,
  redirect?: string,
  beforeEnter?: ()=>void,
  meta?:Object,
  props?: Object,
  children?:RouterEecord[]
}
export function createRouteMap(
  routes: RouterEecord[],
  oldRouteMap?: Record<string,RouterEecord>,
  parentRoute?: any
):Record<string,RouterEecord> {

  
  let routeMap = oldRouteMap || Object.create(null);
  routes.forEach((route: any) => {
    addRouteRecord(routeMap, route, parentRoute);
  });
  return routeMap;
}

function addRouteRecord(pathMap: Record<string,RouterEecord>, route: RouterEecord, parent: RouterEecord|null) {

  
  
  const { path, name } = route;

  const normalizedPath = normalizePath(path, parent);

  //生成一条路由记录

  const record:RouterEecord = {
    path: normalizedPath,
    regex: "",
    components: route.component,
    name,
    parent,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null ? {} : route.props,
  };
  //嵌套路由处理
  if (route.children) {
    route.children.forEach((child: RouterEecord) => {
      addRouteRecord(pathMap, child, record);
    });
  }

  if (!pathMap[record.path as any]) {
    pathMap[record.path as any] = record;
  }
}
function normalizePath(path: string, parent?: any) {
  if (path[0] === "/") return path;
  if (!parent) return path;
  return `${parent.path}/${path}`.replace(/\/\//g, "/");
}
