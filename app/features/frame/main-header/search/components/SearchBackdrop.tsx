type SearchBackdropProps = {
  isActive: boolean;
  isVisible: boolean;
  onClose: () => void;
};

export function SearchBackdrop({
  isActive,
  isVisible,
  onClose,
}: SearchBackdropProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-120 bg-black/30 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
        isActive
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    />
  );
}
