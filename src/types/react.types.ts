import React from "react";
export interface IChildrenProps {
  children: React.ReactNode;
}

export interface IClassAndChildren extends IChildrenProps {
  className?: string;
}
