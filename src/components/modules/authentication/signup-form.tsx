"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 chars"),
  role: z.enum(["CUSTOMER", "SELLER"]),
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const form = useForm({
    defaultValues: { name: "", email: "", password: "", role: "CUSTOMER" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating...");
      try {
        const { error } = await authClient.signUp.email(value);
        if (error) { toast.error(error.message, { id: toastId }); return; }
        toast.success("Account created!");
        router.push(value.role === "SELLER" ? "/seller" : "/dashboard");
      } catch (err) { toast.error("Error occurred"); }
    },
  });


  const inputClass = "h-10 bg-background/50 dark:bg-white/5 border-border rounded-xl focus:ring-1 focus:ring-primary text-sm text-foreground transition-all px-3";
  const labelClass = "text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
     
      className="relative w-full max-w-[420px] mx-auto p-[1.5px] rounded-[32px] overflow-hidden group shadow-2xl"
    >
     
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-100 via-white to-white dark:from-[#2d215a] dark:via-[#0f0a1e] dark:to-[#0f0a1e]" />
      
      
      <div className="absolute inset-0 bg-white/40 dark:bg-black/10 backdrop-blur-3xl" />

      <Card {...props} className="relative border-none bg-transparent rounded-[31px] overflow-hidden">
        <CardHeader className="space-y-1 pt-8 pb-5 text-center">
          <CardTitle className="text-3xl font-black tracking-tighter text-foreground dark:text-white">
            Sign Up
          </CardTitle>
          <CardDescription className="text-muted-foreground dark:text-zinc-400 text-[11px] font-medium uppercase tracking-widest">
            Join MediStore healthcare network
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8">
          <form id="signup-form" className="space-y-4" onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
            <FieldGroup className="space-y-3.5">
              <form.Field name="name">
                {(field) => (
                  <div className="space-y-1">
                    <FieldLabel className={labelClass}>Name</FieldLabel>
                    <Input className={inputClass} placeholder="Imtiaz Rahman" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                  </div>
                )}
              </form.Field>

              <form.Field name="email">
                {(field) => (
                  <div className="space-y-1">
                    <FieldLabel className={labelClass}>Email Address</FieldLabel>
                    <Input type="email" className={inputClass} placeholder="name@example.com" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                  </div>
                )}
              </form.Field>

              <form.Field name="password">
                {(field) => (
                  <div className="space-y-1">
                    <FieldLabel className={labelClass}>Password</FieldLabel>
                    <Input type="password" className={inputClass} placeholder="••••••••" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                  </div>
                )}
              </form.Field>

              <form.Field name="role">
                {(field) => (
                  <div className="pt-1">
                    <div className="grid grid-cols-2 gap-3">
                      {["CUSTOMER", "SELLER"].map((role) => {
                        const isSelected = field.state.value === role;
                        return (
                          <label key={role} className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${isSelected ? 'border-primary bg-primary/10 shadow-sm' : 'border-border bg-background/50 dark:border-white/5 dark:bg-white/5'}`}>
                            <input type="radio" className="sr-only" checked={isSelected} onChange={() => field.handleChange(role as any)} />
                            <div className={`w-2.5 h-2.5 rounded-full border ${isSelected ? 'bg-primary border-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]' : 'border-muted-foreground/30'}`} />
                            <span className={`text-[11px] font-bold ${isSelected ? 'text-foreground dark:text-white' : 'text-muted-foreground'}`}>{role}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pt-6 pb-10 px-8">
          <Button 
            form="signup-form" 
            type="submit" 
            className="h-11 w-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-[#2563eb] dark:to-[#9333ea] hover:opacity-90 text-white font-bold rounded-full text-sm transition-all shadow-lg shadow-primary/20"
          >
            Create Account
          </Button>
          
          <div className="relative w-full flex items-center py-1">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border dark:border-white/10"></span></div>
            <span className="relative mx-auto bg-white dark:bg-[#0f0a1e] px-3 text-[9px] text-muted-foreground font-bold tracking-[0.3em]">OR</span>
          </div>

          <Button
            variant="outline"
            className="h-11 w-full border-border dark:border-white/10 bg-background/50 dark:bg-white/5 hover:bg-accent dark:hover:bg-white/10 text-foreground dark:text-white rounded-full text-[10px] font-bold tracking-wider"
          >
            CONTINUE WITH GOOGLE
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}