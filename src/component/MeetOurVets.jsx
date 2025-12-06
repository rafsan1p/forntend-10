import React from "react";

const vets = [
  {
    id: 1,
    name: "Dr. Alicia Snow",
    specialization: "Winter Dermatology & Paw Care",
    experience: "8 Years Exp.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500"
  },
  {
    id: 2,
    name: "Dr. Kevin Frost",
    specialization: "Cold Weather Nutrition",
    experience: "6 Years Exp.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500"
  },
  {
    id: 3,
    name: "Dr. Scarlett Pine",
    specialization: "Pet Allergies & Dry Skin",
    experience: "5 Years Exp.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500"
  }
];

const MeetOurVets = () => {
  return (
    <div className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Meet Our Expert Vets
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {vets.map((vet) => (
            <div key={vet.id} className="card bg-base-200 shadow-lg">
              <figure>
                <img
                  src={vet.image}
                  alt={vet.name}
                  className="h-56 w-full object-cover object-top"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-primary">{vet.name}</h3>
                <p className="text-sm font-semibold">{vet.specialization}</p>
                <p className="opacity-70 text-sm">{vet.experience}</p>
                <button className="btn btn-primary btn-sm mt-3 w-full">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetOurVets;