import { useState } from "react";
import { Button } from "~components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~components/ui/card";
import { CreateWallet } from "./CreateWallet";
import "../main.css";

function Welcome() {
  const [selected, setSelected] = useState<boolean>(false);
  const [selection, setSelection] = useState<"none" | "create" | "import">(
    "none",
  );

  if (selected === false) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to Borpa Wallet</CardTitle>
            <CardDescription>
              The truly open source Solana wallet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full"
              onClick={() => {
                setSelection("create");
                setSelected(true);
              }}
            >
              Create a new wallet
            </Button>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                setSelection("import");
                setSelected(true);
              }}
            >
              Import an existing wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selection === "create") {
    return (
      <div className="min-h-screen p-4">
        <CreateWallet />
      </div>
    );
  }

  if (selection === "import") {
    return (
      <div className="min-h-screen p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Import Wallet</CardTitle>
            <CardDescription>
              Import wallet functionality is coming soon
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full"
              onClick={() => {
                setSelection("none");
                setSelected(false);
              }}
            >
              Go back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}

export default Welcome;
