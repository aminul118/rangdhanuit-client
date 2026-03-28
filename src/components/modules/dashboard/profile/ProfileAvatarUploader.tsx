"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Trash2, Upload } from "lucide-react";
import { ImageCropperModal } from "./ImageCropperModal";
import { toast } from "sonner";

interface ProfileAvatarUploaderProps {
  defaultValue?: string;
  onImageChange: (file: File | null) => void;
  name?: string;
}

export function ProfileAvatarUploader({ 
  defaultValue, 
  onImageChange, 
  name = "User" 
}: ProfileAvatarUploaderProps) {
  const [preview, setPreview] = useState<string | undefined>(defaultValue);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setIsCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedBlob: Blob) => {
    const croppedFile = new File([croppedBlob], "profile-picture.jpg", { 
      type: "image/jpeg" 
    });
    const url = URL.createObjectURL(croppedBlob);
    setPreview(url);
    onImageChange(croppedFile);
  };

  const handleRemove = () => {
    setPreview(undefined);
    onImageChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-6 group/avatar">
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-linear-to-r from-primary to-indigo-500 rounded-full blur opacity-25 group-hover/avatar:opacity-40 transition duration-500" />
        
        {/* Avatar Container */}
        <div className="relative h-40 w-40 rounded-full border-4 border-background overflow-hidden bg-muted shadow-2xl">
          <Avatar className="h-full w-full">
            <AvatarImage src={preview} className="object-cover" />
            <AvatarFallback className="bg-linear-to-br from-indigo-500 to-purple-600 text-white text-5xl font-black italic">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {/* Hover Overlay */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer backdrop-blur-[2px]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-3 bg-white/10 rounded-full border border-white/20 mb-2"
            >
              <Camera className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-[10px] uppercase font-bold text-white tracking-widest translate-y-2 group-hover/avatar:translate-y-0 transition-all">
              Change Photo
            </span>
          </div>
        </div>

        {/* Action Buttons (Mini) */}
        <div className="absolute -bottom-2 -right-2 flex gap-1">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 bg-background border rounded-2xl shadow-lg text-muted-foreground hover:text-primary hover:scale-110 active:scale-95 transition-all"
            title="Upload new image"
          >
            <Upload className="w-4 h-4" />
          </button>
          
          {preview && (
            <button
              type="button"
              onClick={handleRemove}
              className="p-2.5 bg-background border rounded-2xl shadow-lg text-muted-foreground hover:text-destructive hover:scale-110 active:scale-95 transition-all"
              title="Remove image"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />

      <AnimatePresence>
        {selectedImage && (
          <ImageCropperModal
            image={selectedImage}
            isOpen={isCropperOpen}
            onClose={() => {
              setIsCropperOpen(false);
              setSelectedImage(null);
            }}
            onCropComplete={handleCropComplete}
          />
        )}
      </AnimatePresence>
      
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">Profile Image</p>
        <p className="text-xs text-muted-foreground mt-1">
           JPG, PNG or GIF. Max 2MB.
        </p>
      </div>
    </div>
  );
}
