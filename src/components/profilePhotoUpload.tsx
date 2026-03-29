import { useState, useRef } from "react";
import { Camera } from "lucide-react";
import { motion } from "framer-motion";

interface ProfilePhotoUploadProps {
  photo: string | null;
  onPhotoChange: (photo: string) => void;
}

const ProfilePhotoUpload = ({ photo, onPhotoChange }: ProfilePhotoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-3"
    >
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="relative group w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20 hover:border-primary/50 transition-all duration-300 shadow-lg"
      >
        {photo ? (
          <img src={photo} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Camera className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera className="w-6 h-6 text-primary-foreground" />
        </div>
      </button>
      <span className="text-sm text-muted-foreground">Upload photo</span>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </motion.div>
  );
};

export default ProfilePhotoUpload;
