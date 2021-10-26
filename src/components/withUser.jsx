import React from "react";

import { UserContext } from "../components/providers/UserProvider";

const getDisplayName = (WrapperComponent) => {
  return WrapperComponent.displayName || WrapperComponent.name || "Component";
};

const withUser = (Component) => {
  const WrapperComponent = (props) => {
    return (
      <UserContext.Provider>
        {(user) => <Component user={user} {...props} />}
      </UserContext.Provider>
    );
  };

  WrapperComponent.displayName = `WithUser(${getDisplayName(
    WrapperComponent
  )})`;

  return WrapperComponent;
};

export default withUser;
