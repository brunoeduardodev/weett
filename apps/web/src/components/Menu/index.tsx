import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import type {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
} from "@radix-ui/react-dropdown-menu";

import React, { ComponentRef, forwardRef } from "react";

export const Root = DropdownMenu.Root;
export const Trigger = DropdownMenu.Trigger;
export const Portal = DropdownMenu.Portal;

export const Content = forwardRef<
  ComponentRef<typeof DropdownMenu.Content>,
  DropdownMenuContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <DropdownMenu.Content
      {...props}
      ref={ref}
      className={`w-64 bg-white rounded-md shadow-md ${className}`}
    >
      {children}
    </DropdownMenu.Content>
  );
});

Content.displayName = "MenuContent";

export const Item = forwardRef<
  ComponentRef<typeof DropdownMenu.DropdownMenuItem>,
  DropdownMenuItemProps
>(({ children, className, onClick, ...props }, ref) => {
  return (
    <DropdownMenu.DropdownMenuItem
      className={`text-sm p-3 select-none data-[highlighted]:bg-gray-50 transition-colors duration-100 ease-in-out`}
      ref={ref}
      {...props}
    >
      {children}
    </DropdownMenu.DropdownMenuItem>
  );
});

Item.displayName = "MenuItem";
