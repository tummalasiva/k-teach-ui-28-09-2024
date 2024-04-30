import { jwtDecode } from "jwt-decode";
import React from "react";

export default function ShowComponent({
  module,
  action,
  CustomComponent,
  children,
}) {
  let decodedToken = jwtDecode(window.localStorage.getItem("access_token"));

  if (!decodedToken && !CustomComponent) return null;
  if (!decodedToken && CustomComponent) return CustomComponent;

  let user = window.localStorage.getItem("current_ecs_user");
  if (!user && !CustomComponent) return null;
  if (!user && CustomComponent) return CustomComponent;

  let extractedUser = JSON.parse(user);
  let role = extractedUser.role;

  if (!role) return null;

  if (role.name === "SUPER ADMIN") return children;

  let permissions = role.permissions;

  if (!permissions.find((p) => p.module === module))
    return CustomComponent || null;

  let canShowComponent = permissions
    .find((p) => p.module === module)
    .permissions.includes(action)
    ? true
    : false;

  if (!canShowComponent && !CustomComponent) return null;

  if (!canShowComponent && CustomComponent) return CustomComponent;

  return <>{children}</>;
}
