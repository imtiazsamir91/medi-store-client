"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // ✅ ১. এটি ইম্পোর্ট করুন

const formSchema = z.object({
  password: z.string().min(8, "Minimum length is 8"),
  email: z.string().email("Invalid email address"),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter(); 

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}/admin`, 
    });
  };

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Authenticating...");
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("Welcome back!", { id: toastId });

        
        router.push("/");

        router.refresh(); 

      } catch (err) {
        toast.error("Something went wrong.", { id: toastId });
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative p-[1.5px] rounded-[32px] overflow-hidden group" 
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-400 to-purple-600 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      <Card 
        {...props} 
        className="relative border-white/5 bg-white/5 dark:bg-black/50 backdrop-blur-3xl rounded-[31px] shadow-2xl overflow-hidden"
      >
        <CardHeader className="space-y-1 pb-8 text-center relative z-20">
          <CardTitle className="text-3xl font-black tracking-tighter text-slate-800 dark:text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-zinc-400 font-medium">
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative z-20">
          <form
            id="login-form"
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="space-y-4">
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                  return (
                    <Field className="space-y-2 relative group/field">
                       <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-400 to-purple-600 rounded-b-2xl opacity-0 group-focus-within/field:opacity-100 transition-opacity duration-300 z-30" />
                      <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                        Email Address
                      </FieldLabel>
                      <Input
                        type="email"
                        autoComplete="email"
                        className="h-12 bg-white/5 dark:bg-white/[0.03] border-white/10 rounded-2xl focus:ring-0 focus-visible:ring-0 transition-all placeholder:text-zinc-600 relative z-20"
                        placeholder="name@example.com"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && <FieldError className="text-xs text-red-500 mt-1 ml-1" errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                  return (
                    <Field className="space-y-2 relative group/field">
                      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-400 to-purple-600 rounded-b-2xl opacity-0 group-focus-within/field:opacity-100 transition-opacity duration-300 z-30" />
                      <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                        Password
                      </FieldLabel>
                      <Input
                        type="password"
                        autoComplete="current-password"
                        className="h-12 bg-white/5 dark:bg-white/[0.03] border-white/10 rounded-2xl focus:ring-0 focus-visible:ring-0 transition-all placeholder:text-zinc-600 relative z-20"
                        placeholder="••••••••"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && <FieldError className="text-xs text-red-500 mt-1 ml-1" errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pb-10 relative z-20">
          <Button 
            form="login-form" 
            type="submit" 
            className="h-12 w-full bg-gradient-to-r from-blue-600 via-indigo-400 to-purple-600 hover:from-blue-700 hover:via-indigo-500 hover:to-purple-700 text-white font-black rounded-2xl shadow-xl shadow-blue-500/10 transition-all duration-300 active:scale-[0.98]"
          >
            Sign In
          </Button>
          
          <div className="relative w-full py-2">
             <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
             <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-transparent px-2 text-zinc-500">Or continue with</span></div>
          </div>

          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            type="button"
            className="h-12 w-full bg-white/5 dark:bg-white/[0.02] border-white/10 hover:bg-white/10 hover:border-white/20 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}