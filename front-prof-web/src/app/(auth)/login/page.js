import Image from "next/image";
import { LoginForm } from "./components/login-form";
// import { Login } from "/public/login.svg";
export default function LoginPage() {
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="relative hidden bg-muted lg:block">
          {/* <img
            src="/images/login.jpg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          /> */}
          <Image
            src="/login.svg"
            alt="Login Icon"
            className="absolute inset-0 object-cover scale-50 dark:brightness-[0.2] dark:grayscale"
            layout="fill" // Ensures it takes up the full container
            unoptimized // Needed for SVGs
          />
        </div>
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium"></a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
