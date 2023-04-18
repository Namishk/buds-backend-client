import Stack from "./Stack";
import classNames from "~/utils/classNames";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";

type ModalProps = {
  children: ({ close }: { close: () => void }) => JSX.Element;
  isCloseButtonVisible?: boolean;
  contentClassName?: string;
  description?: string;
  onClose: () => void;
  className?: string;
  heading?: string;
};

const Modal = ({
  isCloseButtonVisible = true,
  contentClassName,
  description,
  className,
  children,
  onClose,
  heading,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Dialog
      className="fixed inset-0 z-10 overflow-y-auto antialiased"
      as="div"
      onClose={handleClose}
      open={isOpen}
    >
      <div className="fixed inset-0 bg-gray-500/50 dark:bg-neutral-800/75" />

      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Panel
          className={classNames(
            "relative mx-auto w-full max-w-screen-sm overflow-hidden rounded-lg bg-white shadow dark:bg-neutral-900",
            className
          )}
        >
          {(heading || description) && (
            <Stack
              align="start"
              className="justify-between border-b p-5 dark:border-neutral-800"
            >
              <Stack direction="vertical" spacing="small">
                {heading && (
                  <Dialog.Title className="text-xl font-medium">
                    {heading}
                  </Dialog.Title>
                )}

                {description && (
                  <Dialog.Description className="text-sm leading-relaxed text-gray-800">
                    {description}
                  </Dialog.Description>
                )}
              </Stack>

              {isCloseButtonVisible && (
                <button
                  type="button"
                  title="Close modal"
                  className="rounded-md text-gray-400 transition hover:text-inherit focus:outline-none dark:text-neutral-500 dark:hover:text-inherit"
                  onClick={handleClose}
                >
                  <XMarkIcon className="w-6" />
                </button>
              )}
            </Stack>
          )}

          {children && (
            <div className={classNames("p-5", contentClassName)}>
              {children({
                close: handleClose,
              })}
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
