import Image from "next/image";
import { LoginForm } from "./components/login-form";
// import { Login } from "/public/login.svg";
export default function LoginPage() {
  return (
    <>
<div className="grid grid-cols-2 h-screen">
  <div className="relative">
    <Image
      src="/login.svg"
      alt="Login Icon"
      className="object-cover w-full h-full scale-75 dark:brightness-[0.2] dark:grayscale"
      fill
    />
  </div>
  <div className="flex items-center justify-center p-8">
    <LoginForm />
  </div>
</div>

    </>
  );
}
