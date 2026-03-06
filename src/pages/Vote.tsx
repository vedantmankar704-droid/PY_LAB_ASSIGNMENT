/**
 * Vote Page — Candidate selection and vote submission
 *
 * Features:
 * - Candidate cards with radio selection
 * - Submit vote with confirmation toast
 * - Reuses the landing page navbar
 * - Web3-styled dark aesthetic
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Vote as VoteIcon, CheckCircle2, Users } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { VoteNavbar } from "@/components/VoteNavbar";

/** Candidate data — would come from API in production */
const candidates = [
  { id: "a", name: "Candidate A", party: "Party Alpha" },
  { id: "b", name: "Candidate B", party: "Party Beta" },
  { id: "c", name: "Candidate C", party: "Party Gamma" },
  { id: "d", name: "Candidate D", party: "Party Delta" },
] as const;

const VotePage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  /** Handle vote submission with validation */
  const handleSubmit = () => {
    if (!selected) {
      setError("Please select a candidate before submitting.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 web3-grid-bg opacity-15" />

      <VoteNavbar />

      <main className="relative z-10 mx-auto max-w-2xl px-4 pb-16 pt-24 sm:px-6">
        {/* Success state */}
        {submitted ? (
          <Card className="animate-fade-in-up border-border/50 bg-card/80 text-center backdrop-blur-xl">
            <CardHeader className="pb-2">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 ring-2 ring-primary/30">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-display text-2xl">Vote Recorded!</CardTitle>
              <CardDescription className="mt-2 text-base">
                Your vote has been recorded successfully.
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-center pt-4">
              <Button
                variant="outline"
                className="border-border/60 text-foreground"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </CardFooter>
          </Card>
        ) : (
          /* Voting form */
          <Card className="animate-fade-in-up border-border/50 bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="font-display text-xl">Cast Your Vote</CardTitle>
                  <CardDescription>Select your preferred candidate</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Candidate selection via RadioGroup */}
              <RadioGroup
                value={selected}
                onValueChange={(val) => {
                  setSelected(val);
                  if (error) setError("");
                }}
                className="space-y-3"
              >
                {candidates.map((c) => (
                  <label
                    key={c.id}
                    htmlFor={`candidate-${c.id}`}
                    className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all hover:border-primary/40 hover:bg-primary/5 ${
                      selected === c.id
                        ? "border-primary/60 bg-primary/10 shadow-md shadow-primary/10"
                        : "border-border/40 bg-muted/20"
                    }`}
                  >
                    <RadioGroupItem value={c.id} id={`candidate-${c.id}`} />
                    <div className="flex-1">
                      <Label
                        htmlFor={`candidate-${c.id}`}
                        className="cursor-pointer text-base font-semibold text-foreground"
                      >
                        {c.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">{c.party}</p>
                    </div>
                    <VoteIcon className="h-5 w-5 text-muted-foreground/50" />
                  </label>
                ))}
              </RadioGroup>

              {/* Validation error */}
              {error && (
                <p className="mt-4 text-sm text-destructive">{error}</p>
              )}
            </CardContent>

            <CardFooter>
              <Button
                onClick={handleSubmit}
                className="w-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
              >
                <VoteIcon className="mr-2 h-4 w-4" />
                Submit Vote
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  );
};

export default VotePage;
