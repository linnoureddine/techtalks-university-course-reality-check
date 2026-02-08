import WriteReviewCard from "@/components/WriteReviewCard";
import StudentReviews from "@/components/StudentReviews";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F2F2F7] px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <WriteReviewCard />
        <StudentReviews />
      </section>
    </main>
  );
}
