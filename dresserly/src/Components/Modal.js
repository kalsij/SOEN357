import { motion } from "framer-motion";

export default function Modal({
  showCancel = true,
  showConfirm = true,
  children,
  confirmText = "Confirm",
  onConfirm,
  onCancel,
}) {
  return (
    <>
      <motion.div
        // Needed for animating css variables
        // eslint-disable-next-line
        initial={{ "--tw-bg-opacity": 0 }}
        // eslint-disable-next-line
        animate={{ "--tw-bg-opacity": 0.5 }}
        // eslint-disable-next-line
        exit={{ "--tw-bg-opacity": 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center bg-gray-500 p-4 text-center sm:items-center sm:p-0"
        onMouseDown={onCancel}
      >
        <motion.div
          onMouseDown={(e) => e.stopPropagation()}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{
            scale: 0,
            transition: {
              type: "linear",
              duration: 0.2,
            },
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 0.1,
          }}
          className="relative w-1/6 overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:max-w-lg"
        >
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">{children}</div>
          <div className="flex justify-end gap-2 bg-[#673ab7]/10 p-4">
            {showCancel && (
              <button className="bg-[#BDBDBD] rounded-lg" onClick={onCancel}>
                Cancel
              </button>
            )}
            {showConfirm && (
              <button
                className="bg-[#673ab7] rounded-lg"
                data-cy="modal-submit text-green-100"
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
