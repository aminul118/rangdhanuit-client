"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { useCallback, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import getCroppedImg from "./cropImage";
import { Crop, ZoomIn } from "lucide-react";

type ImageCropperProps = {
  imageSrc: string;
  onCropComplete: (croppedImage: Blob) => void;
  onClose: () => void;
  aspect?: number;
};

const ImageCropper = ({
  imageSrc,
  onCropComplete,
  onClose,
  aspect = 1,
}: ImageCropperProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropChange = (crop: Point) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropCompleteHandler = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleSave = async () => {
    if (croppedAreaPixels && imageSrc) {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedImage) {
        onCropComplete(croppedImage);
      }
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl bg-black/90 backdrop-blur-xl border-white/10 text-white p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b border-white/10">
          <DialogTitle className="flex items-center gap-2 text-xl font-black">
            <Crop className="text-primary" size={24} />
            Crop Your Image
          </DialogTitle>
        </DialogHeader>

        <div className="relative h-96 w-full bg-black/40">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteHandler}
            onZoomChange={onZoomChange}
            showGrid={true}
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm font-bold tracking-widest uppercase text-muted-foreground">
              <div className="flex items-center gap-2">
                <ZoomIn size={16} />
                Zoom Level
              </div>
              <span className="text-primary">{Math.round(zoom * 100)}%</span>
            </div>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(val) => setZoom(val[0])}
              className="py-4"
            />
          </div>

          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-all rounded-xl h-12 px-6 font-bold"
            >
              Discard
            </Button>
            <Button
              onClick={handleSave}
              className="bg-primary text-primary-foreground hover:opacity-90 transition-all rounded-xl h-12 px-10 font-bold shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)]"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropper;
