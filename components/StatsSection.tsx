import CountUp from "react-countup";
<<<<<<< HEAD
//npm install react-countup
import { useInView } from "react-intersection-observer";
//npm install react-intersection-observer
=======
import { useInView } from "react-intersection-observer";
>>>>>>> d7521b97bc811563e52ba027d57abf2af19f818a

type StatsData = {
  reviews: number;
  students: number;
  universities: number;
  rating: number;
};

export default function StatsSection({ stats }: { stats: StatsData }) {
  const { ref, inView } = useInView({
<<<<<<< HEAD
    triggerOnce: true, // only animate once
    threshold: 0.3, // triggers when 30% of element is visible
=======
    triggerOnce: true,
    threshold: 0.3,
>>>>>>> d7521b97bc811563e52ba027d57abf2af19f818a
  });

  return (
    <section className="text-[#6155F5] py-16" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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
