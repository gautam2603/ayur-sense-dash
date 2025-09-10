import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { sensorApi } from "@/services/sensorApi";

interface ApiConfigDialogProps {
  onUrlUpdate?: (url: string) => void;
}

export const ApiConfigDialog = ({ onUrlUpdate }: ApiConfigDialogProps) => {
  const [ngrokUrl, setNgrokUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    if (ngrokUrl.trim()) {
      sensorApi.setBaseUrl(ngrokUrl.trim());
      onUrlUpdate?.(ngrokUrl.trim());
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Configure API
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure Arduino API</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="ngrok-url">Ngrok URL</Label>
            <Input
              id="ngrok-url"
              placeholder="https://your-ngrok-url.ngrok.io"
              value={ngrokUrl}
              onChange={(e) => setNgrokUrl(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Enter your ngrok tunnel URL that points to your Flask server
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!ngrokUrl.trim()}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};