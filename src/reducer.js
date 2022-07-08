export function reducer(state = {}, action) {
  if (!action || action.type !== "@@minimum-tabbed/activate") {
    return state;
  }

  return Object.assign(
    {},
    state,
    {[action.payload.view]: {tab: action.payload.tab}}
  );
}
