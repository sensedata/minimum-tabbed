export function activate(view, tab) {
  return {type: "@@minimum-tabbed/activate", payload: {view, tab}};
}
