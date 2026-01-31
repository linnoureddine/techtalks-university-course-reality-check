import SignupForm from "../../components/SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl rounded-2xl bg-[#f3f4f6] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] border border-white/10">
        <div className="mx-auto w-full max-w-xl">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-[#111827]">
            Sign up
          </h1>

          <p className="mt-3 text-center text-base text-gray-500">
            Join thousands of students making informed decisions
          </p>

          <div className="mt-6 h-px w-full bg-gray-200" />

          <div className="mt-8">
            <SignupForm />
          </div>
        </div>
      </div>
    </main>
  );
}
