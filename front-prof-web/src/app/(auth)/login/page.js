import Image from "next/image";
import { LoginForm } from "./components/login-form";
export default function LoginPage() {
  return (
    <>
      <div className="grid grid-cols-2 h-screen">
        <div className="relative bg-secondary">
          <Image
            src="/loginImage.svg"
            alt="Login Icon"
            className="object-cover scale-75 w-full h-full dark:brightness-[0.2] dark:grayscale"
            fill
          />
        </div>
        <div className="flex items-center justify-center  p-8">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
