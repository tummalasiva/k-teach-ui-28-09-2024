/** @format */

import React from "react";

export default function CheckPermission({ module, permission, children }) {
  const token = window.localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
  if (!token) return null;

  const user = window.localStorage.getItem(process.env.REACT_APP_CURRENT_USER);
  if (!user) return null;

  let parsedUser = JSON.parse(user);
  let role = parsedUser.role;

  if (!role) return null;
  if (role.name?.toLowerCase() === "super admin") return children;

  let moduleR = role.permissions.find(
    (p) => p.module?.toLowerCase() === module?.toLowerCase()
  );

  if (!moduleR) return null;

  if (!moduleR.permissions.includes(permission?.toLowerCase())) return null;

  return <>{children}</>;
}
