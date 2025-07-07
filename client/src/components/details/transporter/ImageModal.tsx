import { X } from "lucide-react";
import { Button } from "../../ui";

const ImageModal = ({ src, onClose }: { src: string; onClose: () => void }) => (
  <div
    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
    onClick={onClose}
  >
    <div
      className="relative max-w-4xl max-h-[90vh]"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={src}
        alt="Vehicle full view"
        className="w-full h-full object-contain rounded-lg"
      />
      <Button
        size="icon"
        variant="ghost"
        className="absolute -top-2 -right-2 bg-background/50 hover:bg-background h-9 w-9"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>
    </div>
  </div>
);

export default ImageModal;
