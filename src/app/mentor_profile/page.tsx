'use client';
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Save, Linkedin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ProfilePhotoUpload from "@/components/profilePhotoUpload";
import DocumentUpload from "@/components/documentUpload";
import SchedulePicker, { type WeeklySchedule } from "@/components/schedulePicker";

const Index = () => {
  const { toast } = useToast();
  const [photo, setPhoto] = useState<string | null>(null);
  const [university, setUniversity] = useState("");
  const [bio, setBio] = useState("");
  const [dob, setDob] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [documents, setDocuments] = useState<{ name: string; url: string }[]>([]);
  const [schedule, setSchedule] = useState<WeeklySchedule>({});

  const handleSave = () => {
    toast({
      title: "Profile saved",
      description: "Your mentor profile has been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-bold text-foreground">Mentor Profile</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href={'/'}>
              <Button variant="outline" >Cancel</Button>
            </Link>
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Save Profile
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Photo + Basic Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl border border-border p-6 shadow-sm"
        >
          <h2 className="text-base font-semibold text-foreground mb-6">Personal Information</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <ProfilePhotoUpload photo={photo} onPhotoChange={setPhoto} />
            <div className="flex-1 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  University
                </label>
                <Input
                  placeholder="e.g. Stanford University"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    <span className="flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-primary" />
                      LinkedIn Profile
                    </span>
                  </label>
                  <Input
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Bio */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border p-6 shadow-sm"
        >
          <h2 className="text-base font-semibold text-foreground mb-4">Bio</h2>
          <Textarea
            placeholder="Tell students about yourself, your experience, and what you can help with..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={5}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">{bio.length}/500 characters</p>
        </motion.section>

        {/* Documents */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-border p-6 shadow-sm"
        >
          <h2 className="text-base font-semibold text-foreground mb-4">Verification</h2>
          <DocumentUpload
            documents={documents}
            onAdd={(doc) => setDocuments((prev) => [...prev, doc])}
            onRemove={(i) => setDocuments((prev) => prev.filter((_, idx) => idx !== i))}
          />
        </motion.section>

        {/* Schedule */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl border border-border p-6 shadow-sm"
        >
          <h2 className="text-base font-semibold text-foreground mb-4">Teaching Schedule</h2>
          <SchedulePicker schedule={schedule} onChange={setSchedule} />
        </motion.section>
      </main>
    </div>
  );
};

export default Index;
