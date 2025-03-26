"use client";

import React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function StudentRegistration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    educationLevel: "",
    fieldOfStudy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const isStepValid = () => {
    if (step === 1) {
      return formData.fullName.trim() !== "" && formData.email.includes("@");
    } else if (step === 2) {
      return (
        formData.password.length >= 8 &&
        formData.password === formData.confirmPassword
      );
    }
    return formData.educationLevel !== "" && formData.fieldOfStudy !== "";
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 h-screen">
        <div className="relative hidden bg-muted lg:block">
          <Image
            src="/loginImage.svg"
            alt="Login Icon"
            className="object-cover scale-75 w-full h-full dark:brightness-[0.2] dark:grayscale"
            fill
          />
        </div>
        <div className="flex items-center justify-center ">
          <Card className="w-full max-w-md mx-auto backdrop-blur-md shadow-none  border-0 m-0  ">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Student Registration
              </CardTitle>
              <CardDescription className="text-center">
                Create your student account
              </CardDescription>
              <div className="flex justify-center space-x-2 mt-4">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className={`h-2 rounded-full ${
                      i === step
                        ? "w-8 bg-primary"
                        : i < step
                        ? "w-8 bg-primary/60"
                        : "w-8 bg-slate-300 dark:bg-slate-700"
                    }`}
                    initial={{ width: i === step ? 16 : 32 }}
                    animate={{ width: i === step ? 32 : 16 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {step === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="transition-all focus:ring-2 focus:ring-primary/50"
                        />
                        {formData.fullName && (
                          <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className="transition-all focus:ring-2 focus:ring-primary/50"
                        />
                        {formData.email && formData.email.includes("@") && (
                          <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a password"
                          className="transition-all focus:ring-2 focus:ring-primary/50"
                        />
                        {formData.password && formData.password.length >= 8 && (
                          <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                        )}
                      </div>
                      {formData.password && formData.password.length < 8 && (
                        <p className="text-xs text-amber-500">
                          Password must be at least 8 characters
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          className="transition-all focus:ring-2 focus:ring-primary/50"
                        />
                        {formData.confirmPassword &&
                          formData.password === formData.confirmPassword && (
                            <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                          )}
                      </div>
                      {formData.confirmPassword &&
                        formData.password !== formData.confirmPassword && (
                          <p className="text-xs text-red-500">
                            Passwords do not match
                          </p>
                        )}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="educationLevel">Education Level</Label>
                      <Select
                        value={formData.educationLevel}
                        onValueChange={(value) =>
                          handleSelectChange("educationLevel", value)
                        }
                      >
                        <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/50">
                          <SelectValue placeholder="Select your education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high-school">
                            High School
                          </SelectItem>
                          <SelectItem value="bachelors">
                            Bachelor&apos;s Degree
                          </SelectItem>
                          <SelectItem value="masters">
                            Master&apos;s Degree
                          </SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fieldOfStudy">Field of Study</Label>
                      <Input
                        id="fieldOfStudy"
                        name="fieldOfStudy"
                        value={formData.fieldOfStudy}
                        onChange={handleChange}
                        placeholder="Enter your field of study"
                        className="transition-all focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </>
                )}
              </motion.div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              ) : (
                <Link href="/">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                </Link>
              )}

              {step < 3 ? (
                <Button onClick={nextStep} disabled={!isStepValid()}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  disabled={!isStepValid()}
                >
                  Complete Registration
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
