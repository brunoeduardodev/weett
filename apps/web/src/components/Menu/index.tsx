import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const Root = DropdownMenu.Root;
export const Trigger = DropdownMenu.Trigger;
export const Portal = DropdownMenu.Portal;

export const Content = ({
  children,
  className,
  ...props
}: DropdownMenu.MenuContentProps) => {
  return (
    <DropdownMenu.Content
      {...props}
      className={`w-64 bg-white rounded-md shadow-md ${className}`}
    >
      {children}
    </DropdownMenu.Content>
  );
};

export const Item = ({
  children,
  className,
  onClick,
  ...props
}: DropdownMenu.DropdownMenuItemProps) => {
  return (
    <DropdownMenu.DropdownMenuItem
      className={`text-sm p-3 select-none data-[highlighted]:bg-gray-50 transition-colors duration-100 ease-in-out`}
      {...props}
    >
      {children}
    </DropdownMenu.DropdownMenuItem>
  );
};
