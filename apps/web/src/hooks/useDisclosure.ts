import { useCallback, useState } from "react";

export const useDisclosure = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  return {
    isOpen,
    onClose,
    onOpen,
    onToggle,
    setIsOpen,
  };
};
