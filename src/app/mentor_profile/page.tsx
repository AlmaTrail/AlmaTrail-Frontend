'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, Linkedin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ProfilePhotoUpload from "@/components/profilePhotoUpload";
import DocumentUpload from "@/components/documentUpload";
import SchedulePicker, { type WeeklySchedule } from "@/components/schedulePicker";

const ProfileCompletion = ({ percentage }: { percentage: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-4 shadow-sm"
    >
      <h3 className="text-sm font-semibold text-foreground mb-2">Profile Completion</h3>
      <div className="flex items-center gap-3">
        <div className="w-full bg-secondary rounded-full h-2">
          <motion.div
            className="bg-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ ease: "easeInOut" }}
          ></motion.div>
        </div>
        <span className="text-xs font-medium text-muted-foreground">{`${Math.round(percentage)}%`}</span>
      </div>
    </motion.div>
  );
};

const Index = () => {
  const router = useRouter();
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [bio, setBio] = useState("");
  const [dob, setDob] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [documents, setDocuments] = useState<{ name: string; url: string }[]>([]);
  const [schedule, setSchedule] = useState<WeeklySchedule>({});
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [completion, setCompletion] = useState(0);

  const initialState = useRef({
    photo,
    name,
    email,
    university,
    bio,
    dob,
    linkedin,
    documents,
    schedule,
  });

  useEffect(() => {
    initialState.current = {
      photo,
      name,
      email,
      university,
      bio,
      dob,
      linkedin,
      documents,
      schedule,
    };
  }, []);

  useEffect(() => {
    const fields = [
      photo !== null,
      name.trim() !== '',
      email.trim() !== '',
      university.trim() !== '',
      bio.trim() !== '',
      dob !== '',
      linkedin.trim() !== '',
      documents.length > 0,
      Object.keys(schedule).length > 0,
    ];
    const completedCount = fields.filter(Boolean).length;
    const percentage = (completedCount / fields.length) * 100;
    setCompletion(percentage);
  }, [photo, name, email, university, bio, dob, linkedin, documents, schedule]);

  const hasChanges = () => {
    return (
      initialState.current.photo !== photo ||
      initialState.current.name !== name ||
      initialState.current.email !== email ||
      initialState.current.university !== university ||
      initialState.current.bio !== bio ||
      initialState.current.dob !== dob ||
      initialState.current.linkedin !== linkedin ||
      JSON.stringify(initialState.current.documents) !== JSON.stringify(documents) ||
      JSON.stringify(initialState.current.schedule) !== JSON.stringify(schedule)
    );
  };

  const handleCancel = () => {
    if (hasChanges()) {
      setIsCancelDialogOpen(true);
    } else {
      router.push("/");
    }
  };

  const handleSave = () => {
    console.log({
      photo,
      name,
      email,
      university,
      bio,
      dob,
      linkedin,
      documents,
      schedule,
    });
    toast.success("Profile saved", {
      description: "Your mentor profile has been updated successfully.",
    });
    initialState.current = {
      photo,
      name,
      email,
      university,
      bio,
      dob,
      linkedin,
      documents,
      schedule,
    };
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
            <Button
              variant="outline"
              className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure you want to exit?</DialogTitle>
                  <DialogDescription>
                    You have unsaved changes that will be lost.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    className="w-full bg-[#1d0828] text-white font-gilroy-bold shadow-sm transition duration-200 hover:bg-white hover:text-[#3b0764] border-2 border-transparent hover:border-[#3b0764]"
                    onClick={() => {
                      handleSave();
                      setIsCancelDialogOpen(false);
                    }}
                  >
                    Save changes
                  </Button>
                  <Link href={'/'} className="w-full">
                    <Button variant="outline" className="w-full mb-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
                      Exit
                    </Button>
                  </Link>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              onClick={handleSave}
              className="gap-2 bg-[#1d0828] text-white font-gilroy-bold shadow-sm transition duration-200 hover:bg-white hover:text-[#3b0764] border-2 border-transparent hover:border-[#3b0764]"
            >
              <Save className="w-4 h-4" />
              Save Profile
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <ProfileCompletion percentage={completion} />
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
                  Name
                </label>
                <Input
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="e.g. john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
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
