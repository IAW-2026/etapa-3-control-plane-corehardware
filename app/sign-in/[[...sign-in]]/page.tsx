import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center mb-8">
        <SignIn />
      </div>
    </main>
  );
}
