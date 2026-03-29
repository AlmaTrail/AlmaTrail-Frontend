import { useRef } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentUploadProps {
  documents: { name: string; url: string }[];
  onAdd: (doc: { name: string; url: string }) => void;
  onRemove: (index: number) => void;
}

const DocumentUpload = ({ documents, onAdd, onRemove }: DocumentUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onAdd({ name: file.name, url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        College Admission Documents
      </label>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-border hover:border-primary/50 rounded-lg p-6 text-center cursor-pointer transition-colors group"
      >
        <Upload className="w-8 h-8 mx-auto text-muted-foreground group-hover:text-primary transition-colors" />
        <p className="text-sm text-muted-foreground mt-2">
          Click to upload supporting documents
        </p>
        <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB</p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFileChange}
      />
      {documents.length > 0 && (
        <div className="space-y-2">
          {documents.map((doc, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-muted rounded-lg px-4 py-2.5"
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm truncate">{doc.name}</span>
              </div>
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="text-muted-foreground hover:text-destructive transition-colors shrink-0 ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;