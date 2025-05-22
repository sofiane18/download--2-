"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, KeyRound } from "lucide-react";

const verificationFormSchema = z.object({
  code: z.string().length(6, { message: "Code must be 6 digits." }).regex(/^\d{6}$/, { message: "Code must be numeric." }),
});

type VerificationFormValues = z.infer<typeof verificationFormSchema>;

interface VerificationFormProps {
  correctCode: string;
  onVerify: (code: string) => void;
  isVerifying: boolean;
}

export function VerificationForm({ correctCode, onVerify, isVerifying }: VerificationFormProps) {
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const [showManualInput, setShowManualInput] = useState(false);

  const onSubmit = (data: VerificationFormValues) => {
    onVerify(data.code);
  };

  const handleSimulateScan = () => {
    // Simulate successful scan by auto-filling and submitting the correct code
    form.setValue("code", correctCode); 
    onVerify(correctCode);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Verify Purchase</CardTitle>
        <CardDescription>Scan customer's QR code or enter the 6-digit code manually.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button 
          onClick={handleSimulateScan} 
          className="w-full" 
          size="lg"
          disabled={isVerifying}
        >
          <QrCode className="mr-2 h-5 w-5" />
          Simulate QR Code Scan
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or
            </span>
          </div>
        </div>
        
        {!showManualInput && (
            <Button 
                onClick={() => setShowManualInput(true)} 
                variant="outline"
                className="w-full"
                disabled={isVerifying}
            >
                <KeyRound className="mr-2 h-5 w-5" />
                Enter Code Manually
            </Button>
        )}

        {showManualInput && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>6-Digit Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123456" 
                        {...field} 
                        className="text-center text-lg tracking-[0.3em]"
                        maxLength={6}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isVerifying}>
                {isVerifying ? "Verifying..." : "Verify Code"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
