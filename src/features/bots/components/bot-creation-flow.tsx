"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreateBotSchema, CreateBotInput } from "@/features/bots/schemas/bot.schema";
import { createBotAction } from "@/features/bots/actions/bots.actions";
import { BOT_TEMPLATES } from "@/features/bots/constants";
import { BotTemplate, BotLanguage } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { Project } from "@prisma/client";

interface BotCreationFlowProps {
  projects: Project[];
}

const STEPS = [
  { id: "project", title: "Select Project" },
  { id: "general", title: "General Info" },
  { id: "template", title: "Template & Language" },
  { id: "review", title: "Review & Create" },
];

export function BotCreationFlow({ projects }: BotCreationFlowProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(CreateBotSchema),
    defaultValues: {
      projectId: projects.length === 1 ? projects[0].id : "",
      name: "",
      description: "",
      template: BotTemplate.CUSTOM,
      language: BotLanguage.ENGLISH,
      prefix: "!",
    } as z.infer<typeof CreateBotSchema>,
    mode: "onTouched",
  });

  const { trigger, watch } = form;
  const values = watch();

  async function handleNext() {
    let fieldsToValidate: (keyof CreateBotInput)[] = [];
    if (currentStep === 0) fieldsToValidate = ["projectId"];
    if (currentStep === 1) fieldsToValidate = ["name", "description"];
    if (currentStep === 2) fieldsToValidate = ["template", "language", "prefix"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  }

  function handleBack() {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }

  function onSubmit(data: unknown) {
    const parsed = CreateBotSchema.safeParse(data);
    if (!parsed.success) return;
    const validData = parsed.data;
    if (currentStep !== STEPS.length - 1) return;

    setError(null);
    startTransition(async () => {
      const res = await createBotAction(validData);
      if (!res.success) {
        setError(res.error || "Failed to create bot");
        return;
      }
      router.push(`/bots/${res.data.id}`);
    });
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {STEPS.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              index <= currentStep
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted text-muted-foreground"
            }`}
          >
            {index + 1}
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={`w-12 h-1 mx-2 rounded ${index < currentStep ? "bg-primary" : "bg-muted"}`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl py-8">
      <StepIndicator />

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{STEPS[currentStep].title}</CardTitle>
          <CardDescription>
            {currentStep === 0 && "Choose a workspace for your new AI bot."}
            {currentStep === 1 && "Give your bot a name and description."}
            {currentStep === 2 && "Configure the bot's capabilities and default language."}
            {currentStep === 3 && "Review your configuration before generating."}
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6 min-h-[300px]">
              {error && (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* STEP 0: Project */}
              {currentStep === 0 && (
                <FormField
                  control={form.control}
                  name="projectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace Project</FormLabel>
                      {projects.length === 0 ? (
                        <div className="p-4 border rounded text-muted-foreground text-sm">
                          You need to create a project first.
                        </div>
                      ) : (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a project" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {projects.map((p) => (
                              <SelectItem key={p.id} value={p.id}>
                                {p.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* STEP 1: General Info */}
              {currentStep === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bot Name</FormLabel>
                        <FormControl>
                          <Input placeholder="ModeratorBot" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What will this bot do?"
                            className="resize-none"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* STEP 2: Template & Language */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="template"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bot Template</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a template" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {BOT_TEMPLATES.map((t) => (
                              <SelectItem key={t.id} value={t.id}>
                                <div className="flex items-center">
                                  <t.icon className="h-4 w-4 mr-2" />
                                  {t.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Language</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(BotLanguage).map((lang) => (
                                <SelectItem key={lang} value={lang}>
                                  {lang}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="prefix"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Command Prefix</FormLabel>
                          <FormControl>
                            <Input placeholder="!" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-3 gap-4 border-b pb-4">
                    <div className="text-muted-foreground">Project</div>
                    <div className="col-span-2 font-medium">
                      {projects.find((p) => p.id === values.projectId)?.name || "Unknown"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b pb-4">
                    <div className="text-muted-foreground">Name</div>
                    <div className="col-span-2 font-medium">{values.name}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b pb-4">
                    <div className="text-muted-foreground">Template</div>
                    <div className="col-span-2 font-medium">
                      {BOT_TEMPLATES.find((t) => t.id === values.template)?.name || values.template}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pb-4">
                    <div className="text-muted-foreground">Prefix</div>
                    <div className="col-span-2 font-medium font-mono">{values.prefix}</div>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between border-t p-6">
              <Button
                type="button"
                variant="ghost"
                onClick={currentStep === 0 ? () => router.back() : handleBack}
              >
                {currentStep === 0 ? (
                  "Cancel"
                ) : (
                  <>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </>
                )}
              </Button>

              {currentStep < STEPS.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={currentStep === 0 && projects.length === 0}
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Bot
                </Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
