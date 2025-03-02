import { defineStepper } from "@stepperize/react";
import { CheckIcon, ClipboardCopyIcon } from "lucide-react";

import { useState } from "react";
import * as zxcvbn from "zxcvbn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generateMnemonic } from "@scure/bip39";

import { wordlist } from "@scure/bip39/wordlists/english";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~components/ui/form";

const seedPhraseString = generateMnemonic(wordlist);
const seedPhrase = seedPhraseString.split(" ");

function GenerateSeedPhrase() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (seedPhrase) {
      navigator.clipboard.writeText(seedPhraseString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-md">
        <p className="text-sm font-mono break-all">
          {seedPhraseString || "Your seed phrase will appear here"}
        </p>
      </div>

      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip open={copied}>
            <TooltipContent>
              <p>Copied!</p>
            </TooltipContent>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={handleCopy} className="gap-2">
                {copied ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <ClipboardCopyIcon className="h-4 w-4" />
                )}
                Copy
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

function VerifySeedPhrase() {
  const formSchema = z.object({
    word3: z
      .string()
      .max(8)
      .refine((val) => wordlist.includes(val), "Not a valid BIP39 word")
      .refine((val) => val === seedPhrase[2], "Not the right word"),
    word7: z
      .string()
      .max(8)
      .refine((val) => {
        wordlist.includes(val);
      }),
    word9: z
      .string()
      .max(8)
      .refine((val) => {
        wordlist.includes(val);
      }),
    word12: z
      .string()
      .max(8)
      .refine((val) => {
        wordlist.includes(val);
      }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word3: "",
      word7: "",
      word9: "",
      word12: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("form value = ", values);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm">
        Enter parts of your seed phrase to verify you&apos;ve saved it correctly.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="word3"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Word 3</FormLabel>
                <FormControl>
                  <Input placeholder="Enter word #3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="word7"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Word 7</FormLabel>
                <FormControl>
                  <Input placeholder="Enter word #7" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="word9"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Word 9</FormLabel>
                <FormControl>
                  <Input placeholder="Enter word #9" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="word12"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Word 12</FormLabel>
                <FormControl>
                  <Input placeholder="Enter word #12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

function SetPassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(zxcvbn(newPassword) * 25);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Password</label>
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
        />
        {password && (
          <div className="space-y-1">
            <div className="text-xs">Password strength</div>
            <Progress value={passwordStrength} className="h-2" />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Confirm Password</label>
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
      <div className="rounded-md bg-muted p-3">
        <p className="text-xs text-muted-foreground">
          Password must be at least 8 characters long and include a mixture of upper and lowercase
          letters, numbers, and symbols.
        </p>
      </div>
    </div>
  );
}

function WalletReady() {
  return (
    <div className="text-center space-y-4 py-6">
      <div className="flex justify-center">
        <div className="h-16 w-16 rounded-full bg-primary/20 text-primary flex items-center justify-center">
          <CheckIcon className="h-8 w-8" />
        </div>
      </div>
      <h3 className="font-medium text-lg">Your wallet is ready!</h3>
      <p className="text-sm text-muted-foreground">
        You can now send, receive, and manage your crypto.
      </p>
    </div>
  );
}

const { useStepper, Scoped } = defineStepper(
  {
    id: "first",
    title: "Create Seed Phrase",
    description: "This will generate a new seed phrase for your wallet.",
    children: <GenerateSeedPhrase />,
  },
  {
    id: "second",
    title: "Verify Seed Phrase",
    description: "Confirm you've saved your seed phrase correctly.",
    children: <VerifySeedPhrase />,
  },
  {
    id: "third",
    title: "Create Password",
    description: "Create a password to protect your wallet.",
    children: <SetPassword />,
  },
  {
    id: "last",
    title: "Wallet Created",
    description: "Your wallet has been created successfully.",
    children: <WalletReady />,
  }
);

export function CreateWallet() {
  const stepper = useStepper();

  const progress = (() => {
    if (stepper.current.id === "first") return 25;
    if (stepper.current.id === "second") return 50;
    if (stepper.current.id === "third") return 75;
    return 100;
  })();

  return (
    <Scoped>
      <div className="flex flex-col w-full max-w-md mx-auto">
        <Progress value={progress} className="mb-6" aria-label={`Step ${progress / 25} of 4`} />

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{stepper.current.title}</CardTitle>
            <CardDescription>{stepper.current.description}</CardDescription>
          </CardHeader>
          <CardContent>{stepper.current.children}</CardContent>
        </Card>

        <div className="flex justify-between">
          <Button onClick={stepper.prev} disabled={stepper.isFirst} variant="outline">
            Previous
          </Button>

          {!stepper.isLast ? (
            <Button onClick={stepper.next}>
              {stepper.current.id === "third" ? "Finish" : "Next"}
            </Button>
          ) : (
            <Button onClick={window.close}>Done</Button>
          )}
        </div>
      </div>
    </Scoped>
  );
}
