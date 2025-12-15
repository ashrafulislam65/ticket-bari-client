import { FaBus, FaLock, FaBolt, FaHeadset } from "react-icons/fa";

const features = [
  {
    icon: <FaBus />,
    title: "Easy Booking",
    desc: "Book tickets in just a few clicks",
  },
  {
    icon: <FaLock />,
    title: "Secure Payment",
    desc: "100% safe & encrypted transactions",
  },
  {
    icon: <FaBolt />,
    title: "Instant Confirmation",
    desc: "Get ticket confirmation instantly",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    desc: "We are here to help anytime",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="my-20 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-4">
        Why Choose Ticket Bari?
      </h2>
      <p className="text-center text-gray-500 mb-12">
        Trusted by thousands of travelers across Bangladesh
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6 text-center"
          >
            <div className="text-neutral text-3xl mb-4 flex justify-center">
              {item.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
