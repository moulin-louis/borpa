import type { ReactNode } from "react";
import { defineStepper } from "@stepperize/react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const { useStepper, Scoped } = defineStepper(
  {
    id: "first",
    title: "Create Seed Phrase",
    description: "This will generate a new seed phrase for your wallet.",
  },
  {
    id: "second",
    title: "Verify Seed Phrase",
    description: "Confirm you've saved your seed phrase correctly.",
  },
  {
    id: "third",
    title: "Create Password",
    description: "Create a password to protect your wallet.",
  },
  {
    id: "last",
    title: "Wallet Created",
    description: "Your wallet has been created successfully.",
  },
);

function CardStep({
  title,
  description,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

export function CreateWallet() {
  const stepper = useStepper();
  const [seedPhrase, setSeedPhrase] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  return (
    <Scoped>
      <div className="flex flex-col w-full max-w-md mx-auto">
        {stepper.when("first", (step) => (
          <CardStep
            title={step.title}
            description={step.description}
            children={<></>}
          />
        ))}

        {stepper.when("second", (step) => (
          <CardStep
            title={step.title}
            description={step.description}
            children={<></>}
          />
        ))}

        {stepper.when("third", (step) => (
          <CardStep
            title={step.title}
            description={step.description}
            children={<></>}
          />
        ))}

        {stepper.when("last", (step) => (
          <CardStep
            title={step.title}
            description={step.description}
            children={<></>}
          />
        ))}
      </div>
      {!stepper.isLast ? (
        <div className="flex items-center gap-2">
          <Button onClick={stepper.prev} disabled={stepper.isFirst}>
            Previous
          </Button>

          <Button onClick={stepper.next}>
            {stepper.when(
              "third",
              () => "Finish",
              () => "Next",
            )}
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button onClick={stepper.reset}>Reset</Button>
        </div>
      )}
    </Scoped>
  );
}

/*
 *<div className="flex flex-col w-full max-w-md mx-auto">

          <CardContent>
            <Scoped id="seed-phrase">
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm font-mono break-all">
                    {seedPhrase || "Your seed phrase will appear here"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      // In a real app, generate a proper seed phrase here
                      const mockSeedPhrase = "abandon ability able about above absent absorb abstract absurd abuse access accident"
                      setSeedPhrase(mockSeedPhrase)
                    }}
                  >
                    Generate Seed Phrase
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (seedPhrase) {
                        navigator.clipboard.writeText(seedPhrase)
                      }
                    }}
                    disabled={!seedPhrase}
                  >
                    Copy
                  </Button>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saved-phrase"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                    />
                    <label htmlFor="saved-phrase" className="text-sm">
                      I have saved my seed phrase in a secure location
                    </label>
                  </div>
                </div>
              </div>
            </Scoped>

            <Scoped id="verify-phrase">
              <div className="space-y-4">
                <p className="text-sm">Enter parts of your seed phrase to verify you've saved it correctly.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm">Word #3</label>
                    <Input placeholder="Enter word #3" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Word #7</label>
                    <Input placeholder="Enter word #7" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Word #9</label>
                    <Input placeholder="Enter word #9" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Word #12</label>
                    <Input placeholder="Enter word #12" />
                  </div>
                </div>
              </div>
            </Scoped>

            <Scoped id="create-password">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm">Password</label>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {password && confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-destructive">Passwords do not match</p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters long and include a mixture of upper and lowercase letters, numbers, and symbols.
                </p>
              </div>
            </Scoped>

            <Scoped id="wallet-created">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-medium text-lg">Your wallet is ready!</h3>
                <p className="text-sm text-muted-foreground">
                  You can now send, receive, and manage your crypto.
                </p>
              </div>
            </Scoped>
          </CardContent>

        </Card>

      </div>
 */
