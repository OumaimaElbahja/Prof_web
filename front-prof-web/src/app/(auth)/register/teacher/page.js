"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
  Mail,
  Lock,
  GraduationCap,
  Briefcase,
} from "lucide-react";

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

export default function TeacherRegistration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    academicTitle: "",
    department: "",
    researchInterests: "",
    linkedIn: "",
    googleScholar: "",
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
      return (
        formData.firstName.trim() !== "" &&
        formData.email.includes("@") &&
        formData.lastName.trim() !== ""
      );
    } else if (step === 2) {
      return (
        formData.password.length >= 8 &&
        formData.password === formData.confirmPassword
      );
    }
    return formData.department !== "" && formData.academicTitle !== "";
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 h-screen">
        <div className="relative hidden bg-muted lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm"></div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center space-y-6 max-w-md px-8">
              <GraduationCap className="h-24 w-24 mx-auto text-primary" />
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
                Empower Future Minds
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Join our academic community and make a difference in education.
                Share your expertise, inspire students, and contribute to
                cutting-edge research.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md mx-auto backdrop-blur-md shadow-none border-0 m-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Teacher Registration
              </CardTitle>
              <CardDescription className="text-center">
                Create your professional academic account
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
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Enter your first name"
                          className="transition-all focus:ring-2 focus:ring-primary/50"
                        />
                        {formData.firstName && (
                          <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <div className="relative">
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Enter your last name"
                          className="transition-all focus:ring-2 focus:ring-primary/50"
                        />
                        {formData.lastName && (
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
                          placeholder="Enter your institutional email"
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
                          placeholder="Create a secure password"
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
                    <div className="space-y-2">
                      <Label htmlFor="linkedIn">
                        LinkedIn Profile (Optional)
                      </Label>
                      <Input
                        id="linkedIn"
                        name="linkedIn"
                        value={formData.linkedIn}
                        onChange={handleChange}
                        placeholder="Your LinkedIn profile URL"
                        className="transition-all focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="academicTitle">Academic Title</Label>
                      <Select
                        value={formData.academicTitle}
                        onValueChange={(value) =>
                          handleSelectChange("academicTitle", value)
                        }
                      >
                        <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/50">
                          <SelectValue placeholder="Select your academic title" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lecturer">Lecturer</SelectItem>
                          <SelectItem value="assistant-professor">
                            Assistant Professor
                          </SelectItem>
                          <SelectItem value="associate-professor">
                            Associate Professor
                          </SelectItem>
                          <SelectItem value="full-professor">
                            Full Professor
                          </SelectItem>
                          <SelectItem value="senior-lecturer">
                            Senior Lecturer
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) =>
                          handleSelectChange("department", value)
                        }
                      >
                        <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/50">
                          <SelectValue placeholder="Select your department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="computer-science">
                            Computer Science
                          </SelectItem>
                          <SelectItem value="mathematics">
                            Mathematics
                          </SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="engineering">
                            Engineering
                          </SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="arts">
                            Arts & Humanities
                          </SelectItem>
                          <SelectItem value="social-sciences">
                            Social Sciences
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="researchInterests">
                        Research Interests
                      </Label>
                      <Input
                        id="researchInterests"
                        name="researchInterests"
                        value={formData.researchInterests}
                        onChange={handleChange}
                        placeholder="List your key research areas"
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
                <Link href="/login">
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

// "use client";

// import React from "react";

// import { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//   ArrowLeft,
//   CheckCircle2,
//   Briefcase,
//   GraduationCap,
//   Mail,
//   User,
//   Lock,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function TeacherRegistration() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     linkedIn: "",
//     googleScholar: "",
//     specialization: "",
//     department: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const isFormValid = () => {
//     return (
//       formData.fullName.trim() !== "" &&
//       formData.email.includes("@") &&
//       formData.password.length >= 8 &&
//       formData.password === formData.confirmPassword &&
//       formData.specialization !== "" &&
//       formData.department !== ""
//     );
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
//       <Link href="/" className="absolute top-4 left-4">
//         <Button variant="ghost" size="sm">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Home
//         </Button>
//       </Link>

//       <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="hidden lg:flex flex-col items-center justify-center p-8"
//         >
//           <div className="relative w-full h-full flex flex-col items-center justify-center">
//             <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl backdrop-blur-sm border border-white/20 shadow-xl"></div>
//             <div className="relative z-10 text-center space-y-6 p-8">
//               <GraduationCap className="h-24 w-24 mx-auto text-primary" />
//               <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
//                 Join Our Teaching Community
//               </h2>
//               <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
//                 Share your knowledge and expertise with students around the
//                 world. Become a part of our growing educational platform.
//               </p>
//               <div className="grid grid-cols-2 gap-4 mt-8">
//                 <div className="bg-white/20 dark:bg-slate-800/40 p-4 rounded-lg backdrop-blur-sm">
//                   <h3 className="font-medium text-slate-900 dark:text-white">
//                     Create Courses
//                   </h3>
//                   <p className="text-sm text-slate-600 dark:text-slate-400">
//                     Design and publish your own courses
//                   </p>
//                 </div>
//                 <div className="bg-white/20 dark:bg-slate-800/40 p-4 rounded-lg backdrop-blur-sm">
//                   <h3 className="font-medium text-slate-900 dark:text-white">
//                     Connect
//                   </h3>
//                   <p className="text-sm text-slate-600 dark:text-slate-400">
//                     Engage with students worldwide
//                   </p>
//                 </div>
//                 <div className="bg-white/20 dark:bg-slate-800/40 p-4 rounded-lg backdrop-blur-sm">
//                   <h3 className="font-medium text-slate-900 dark:text-white">
//                     Earn
//                   </h3>
//                   <p className="text-sm text-slate-600 dark:text-slate-400">
//                     Get compensated for your expertise
//                   </p>
//                 </div>
//                 <div className="bg-white/20 dark:bg-slate-800/40 p-4 rounded-lg backdrop-blur-sm">
//                   <h3 className="font-medium text-slate-900 dark:text-white">
//                     Grow
//                   </h3>
//                   <p className="text-sm text-slate-600 dark:text-slate-400">
//                     Build your professional portfolio
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           <Card className="backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 shadow-xl">
//             <CardHeader>
//               <CardTitle className="text-2xl font-bold text-center">
//                 Teacher Registration
//               </CardTitle>
//               <CardDescription className="text-center">
//                 Create your teacher account
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="fullName" className="flex items-center">
//                     <User className="h-4 w-4 mr-2 text-slate-500" />
//                     Full Name
//                   </Label>
//                   <div className="relative">
//                     <Input
//                       id="fullName"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       placeholder="Enter your full name"
//                       className="transition-all focus:ring-2 focus:ring-primary/50"
//                     />
//                     {formData.fullName && (
//                       <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
//                     )}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="email" className="flex items-center">
//                     <Mail className="h-4 w-4 mr-2 text-slate-500" />
//                     Email Address
//                   </Label>
//                   <div className="relative">
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="Enter your email"
//                       className="transition-all focus:ring-2 focus:ring-primary/50"
//                     />
//                     {formData.email && formData.email.includes("@") && (
//                       <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="password" className="flex items-center">
//                     <Lock className="h-4 w-4 mr-2 text-slate-500" />
//                     Password
//                   </Label>
//                   <div className="relative">
//                     <Input
//                       id="password"
//                       name="password"
//                       type="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       placeholder="Create a password"
//                       className="transition-all focus:ring-2 focus:ring-primary/50"
//                     />
//                     {formData.password && formData.password.length >= 8 && (
//                       <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
//                     )}
//                   </div>
//                   {formData.password && formData.password.length < 8 && (
//                     <p className="text-xs text-amber-500">
//                       Password must be at least 8 characters
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="confirmPassword"
//                     className="flex items-center"
//                   >
//                     <Lock className="h-4 w-4 mr-2 text-slate-500" />
//                     Confirm Password
//                   </Label>
//                   <div className="relative">
//                     <Input
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       type="password"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       placeholder="Confirm your password"
//                       className="transition-all focus:ring-2 focus:ring-primary/50"
//                     />
//                     {formData.confirmPassword &&
//                       formData.password === formData.confirmPassword && (
//                         <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
//                       )}
//                   </div>
//                   {formData.confirmPassword &&
//                     formData.password !== formData.confirmPassword && (
//                       <p className="text-xs text-red-500">
//                         Passwords do not match
//                       </p>
//                     )}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="linkedIn">LinkedIn Profile (Optional)</Label>
//                   <Input
//                     id="linkedIn"
//                     name="linkedIn"
//                     value={formData.linkedIn}
//                     onChange={handleChange}
//                     placeholder="Your LinkedIn URL"
//                     className="transition-all focus:ring-2 focus:ring-primary/50"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="googleScholar">
//                     Google Scholar (Optional)
//                   </Label>
//                   <Input
//                     id="googleScholar"
//                     name="googleScholar"
//                     value={formData.googleScholar}
//                     onChange={handleChange}
//                     placeholder="Your Google Scholar URL"
//                     className="transition-all focus:ring-2 focus:ring-primary/50"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="specialization" className="flex items-center">
//                     <Briefcase className="h-4 w-4 mr-2 text-slate-500" />
//                     Specialization
//                   </Label>
//                   <Input
//                     id="specialization"
//                     name="specialization"
//                     value={formData.specialization}
//                     onChange={handleChange}
//                     placeholder="Your area of expertise"
//                     className="transition-all focus:ring-2 focus:ring-primary/50"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="department" className="flex items-center">
//                     <GraduationCap className="h-4 w-4 mr-2 text-slate-500" />
//                     Department
//                   </Label>
//                   <Select
//                     value={formData.department}
//                     onValueChange={(value) =>
//                       handleSelectChange("department", value)
//                     }
//                   >
//                     <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/50">
//                       <SelectValue placeholder="Select your department" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="computer-science">
//                         Computer Science
//                       </SelectItem>
//                       <SelectItem value="mathematics">Mathematics</SelectItem>
//                       <SelectItem value="physics">Physics</SelectItem>
//                       <SelectItem value="chemistry">Chemistry</SelectItem>
//                       <SelectItem value="biology">Biology</SelectItem>
//                       <SelectItem value="engineering">Engineering</SelectItem>
//                       <SelectItem value="business">Business</SelectItem>
//                       <SelectItem value="arts">Arts & Humanities</SelectItem>
//                       <SelectItem value="social-sciences">
//                         Social Sciences
//                       </SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Link href="/">
//                 <Button variant="outline">
//                   <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
//                 </Button>
//               </Link>

//               <Button
//                 type="submit"
//                 className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg hover:shadow-primary/20"
//                 disabled={!isFormValid()}
//               >
//                 Complete Registration
//               </Button>
//             </CardFooter>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
