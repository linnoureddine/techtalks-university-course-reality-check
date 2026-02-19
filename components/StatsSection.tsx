import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

type StatsData = {
  reviews: number;
  students: number;
  universities: number;
  rating: number;
};

export default function StatsSection({ stats }: { stats: StatsData }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="text-[#6155F5] py-16" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div>
          <h2 className="text-4xl sm:text-4xl font-bold">
            {inView ? (
              <CountUp end={stats.reviews} duration={2} suffix="K+" />
            ) : (
              "0K+"
            )}
          </h2>
          <p className="mt-2 text-sm sm:text-base">Course Reviews</p>
        </div>
        <div>
          <h2 className="text-4xl sm:text-4xl font-bold">
            {inView ? (
              <CountUp end={stats.students} duration={2} suffix="K+" />
            ) : (
              "0K+"
            )}
          </h2>
          <p className="mt-2 text-sm sm:text-base">Active Students</p>
        </div>
        <div>
          <h2 className="text-4xl sm:text-4xl font-bold">
            {inView ? (
              <CountUp end={stats.universities} duration={2} suffix="+" />
            ) : (
              "0+"
            )}
          </h2>
          <p className="mt-2 text-sm sm:text-base">Universities</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-4xl sm:text-4xl font-bold">
            {inView ? (
              <CountUp end={(stats.rating / 5) * 100} duration={2} suffix="%" />
            ) : (
              "0%"
            )}
          </h2>
          <p className="mt-2 text-sm sm:text-base">Would Recommend</p>
        </div>
      </div>
    </section>
  );
}
