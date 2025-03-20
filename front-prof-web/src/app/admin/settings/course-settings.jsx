"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

const courseFormSchema = z.object({
  defaultGradingScale: z.enum(["percentage", "letter", "points"], {
    required_error: "Please select a default grading scale.",
  }),
  defaultVisibility: z.enum(["visible", "hidden"], {
    required_error: "Please select a default visibility.",
  }),
  lateSubmissionPolicy: z.enum(["accept", "reject", "penalty"], {
    required_error: "Please select a late submission policy.",
  }),
  penaltyPercentage: z.string().optional(),
  defaultSyllabus: z.string().optional(),
  autoPublishGrades: z.boolean().default(false),
  allowStudentDiscussions: z.boolean().default(true),
  enablePlagiarismDetection: z.boolean().default(true),
})


const defaultValues = {
  defaultGradingScale: "percentage",
  defaultVisibility: "hidden",
  lateSubmissionPolicy: "penalty",
  penaltyPercentage: "10",
  defaultSyllabus:
    "# Course Syllabus\n\n## Course Description\n\n## Learning Objectives\n\n## Grading Policy\n\n## Schedule",
  autoPublishGrades: false,
  allowStudentDiscussions: true,
  enablePlagiarismDetection: true,
}

export function CourseSettings() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(courseFormSchema),
    defaultValues,
  })

  const watchLateSubmissionPolicy = form.watch("lateSubmissionPolicy")

  function onSubmit(data) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log(data)
      setIsLoading(false)
      toast({
        title: "Course defaults updated",
        description: "Your course default settings have been saved successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Default Settings</CardTitle>
          <CardDescription>Set default settings for all new courses you create.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="defaultGradingScale"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Grading Scale</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a grading scale" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage (0-100%)</SelectItem>
                          <SelectItem value="letter">Letter Grade (A-F)</SelectItem>
                          <SelectItem value="points">Points</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>The default grading scale for new assignments.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="defaultVisibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Assignment Visibility</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="visible">Visible to students</SelectItem>
                          <SelectItem value="hidden">Hidden from students</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Whether new assignments are visible to students by default.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lateSubmissionPolicy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Late Submission Policy</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select policy" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="accept">Accept without penalty</SelectItem>
                          <SelectItem value="reject">Do not accept</SelectItem>
                          <SelectItem value="penalty">Accept with penalty</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>How to handle late submissions by default.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchLateSubmissionPolicy === "penalty" && (
                  <FormField
                    control={form.control}
                    name="penaltyPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Late Penalty Percentage</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" max="100" {...field} />
                        </FormControl>
                        <FormDescription>Percentage deducted for late submissions.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="defaultSyllabus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Syllabus Template</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a default syllabus template for new courses"
                        className="min-h-[200px] font-mono text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Markdown is supported. This template will be used for new courses.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Settings</h3>

                <FormField
                  control={form.control}
                  name="autoPublishGrades"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Auto-publish Grades</FormLabel>
                        <FormDescription>
                          Automatically publish grades to students when grading is complete.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allowStudentDiscussions"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Allow Student Discussions</FormLabel>
                        <FormDescription>Enable discussion forums for students in new courses.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enablePlagiarismDetection"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable Plagiarism Detection</FormLabel>
                        <FormDescription>Automatically check student submissions for plagiarism.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save defaults"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

