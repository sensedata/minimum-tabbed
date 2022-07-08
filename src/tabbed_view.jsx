import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {activate} from "./activate.js";

export function TabbedView(props) {
  console.group("TabbedView");
  try {
    if (!props?.children?.length) {
      console.warn("TabbedView missing any children", {props});
      return React.createElement("div", {className: "minimum-tabbed.empty-tabs"});
    }

    const storedTab = useSelector(s => s.tabbed[props.view]?.tab);
    const dispatch = useDispatch();

    const tabHandler = (tab) => () => dispatch(activate(props.view, tab));

    const key = (item) => item.props.key ?? item.props.name;
    const finder = (target) => (child) => key(child) === target;

    let activeContent, activeTab;
    const makeActive = (found) => {
      console.debug("makeActive", {found});
      activeContent = found.props.content;
      activeTab = key(found);
    }

    makeActive(
      props.children.find(finder(storedTab))
      ?? props.children.find(finder(props.default))
      ?? props.children[0]
    );

    const className = `tabbed-view ${activeTab}`;

    return (
      <div className={className}>
        <div className="tabbed-control" role="tablist">
          {
            props.children.map((t) => {
              const k = key(t);
              const a = k === activeTab;
              const cn = `tabbed-label ${k} ${k === activeTab ? "active" : "inactive"}`;
              return (
                <button
                  role="tab"
                  className={cn}
                  aria-selected={a}
                  disabled={a}
                  onClick={tabHandler(k)}
                  key={k}
                >
                  <span className="tabbed-label-icon">{t.props.icon}</span>
                  <span className="tabbed-label-text">{t.props.name}</span>
                </button>
              )
            })
          }
        </div>

        <div className="tabbed-content" role="tabpanel">
          {activeContent}
        </div>
      </div>
    );
  } finally {
    console.groupEnd();
  }
}
