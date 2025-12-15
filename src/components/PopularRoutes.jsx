import { Link } from "react-router";

const popularRoutes = [
  { from: "Dhaka", to: "Cox's Bazar", price: 120 },
  { from: "Dhaka", to: "Chittagong", price: 60 },
  { from: "Dhaka", to: "Sylhet", price: 50 },
  { from: "Dhaka", to: "Barishal", price: 40 },
];

const PopularRoutes = () => {
  return (
    <section className="my-20 bg-linear-to-r lg:mx-30 from-indigo-600 to-purple-600 py-16 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 text-white">
        <h2 className="text-3xl font-bold text-center mb-4">
          Popular Routes
        </h2>
        <p className="text-center text-indigo-100 mb-10">
          Most booked destinations by travelers
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRoutes.map((route, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur rounded-xl p-5 hover:bg-white/20 transition"
            >
              <h3 className="text-lg font-semibold mb-2">
                {route.from} → {route.to}
              </h3>
              <p className="text-sm text-indigo-100 mb-4">
                Starting from ${route.price}
              </p>
              <Link
                to={`/search?from=${route.from}&to=${route.to}`}
                className="inline-block text-sm font-medium underline"
              >
                View Tickets →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
