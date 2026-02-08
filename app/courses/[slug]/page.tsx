import CourseInfo from "@/components/CourseInfo";
import WriteReviewCard from "@/components/WriteReviewCard";
import StudentReviews from "@/components/StudentReviews";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] px-6 py-10">
      <section className="mx-auto max-w-5xl">
        <CourseInfo />
        <WriteReviewCard />
        <StudentReviews />
      </section>
    </main>
  );
}
