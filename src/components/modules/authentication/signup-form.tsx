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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Minimum length is 8"),
  role: z.enum(["CUSTOMER", "SELLER"]),
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3001",
    });
    console.log(data);
  };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER",
    },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating user");

      try {
        // 🔑 Only send fields backend expects for now
        const payload = {
          name: value.name,
          email: value.email,
          password: value.password,
          role: value.role, // Include role if backend supports it
        };

        const { error } = await authClient.signUp.email(payload);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Created Successfully", { id: toastId });

        // 🔑 Auto-login
        const { error: loginError } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });

        if (loginError) {
          toast.error("Signup successful, check your mail and verify", { id: toastId });
          return;
        }

        // 🔑 Redirect based on role
        if (value.role === "SELLER") {
          router.push("/seller");
        } else {
          router.push("/dashboard");
        }
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  const { Field: FormField } = form;

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="signup-form"
          onSubmit={async (e) => {
            e.preventDefault();
            await form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Name */}
            <FormField name="name">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </FormField>

            {/* Email */}
            <FormField name="email">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </FormField>

            {/* Password */}
            <FormField name="password">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </FormField>

            {/* Role */}
            <FormField name="role">
              {(field) => (
                <Field>
                  <FieldLabel>Register as</FieldLabel>
                  <div className="flex gap-6 mt-2">
                    {["CUSTOMER", "SELLER"].map((role) => (
                      <label key={role} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={field.name}
                          value={role}
                          checked={field.state.value === role}
                          onChange={() => field.handleChange(role)}
                        />
                        <span>{role.charAt(0) + role.slice(1).toLowerCase()}</span>
                      </label>
                    ))}
                  </div>
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            </FormField>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-5">
        <Button form="signup-form" type="submit" className="w-full">
          Register
        </Button>
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          type="button"
          className="w-full"
        >
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
