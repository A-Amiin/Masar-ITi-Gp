const ORS_API_KEY = import.meta.env.VITE_ORS_API_KEY;

export const optimizeRouteORS = async (customers) => {
  const jobs = customers.map((c, index) => ({
    id: index + 1,
    location: [
      parseFloat(c.lng), // lng
      parseFloat(c.lat), // lat
    ],
    service: 300, // ⬅️ REQUIRED
  }));

  const body = {
    jobs,
    vehicles: [
      {
        id: 1,
        profile: "driving-car", // ⬅️ REQUIRED
        start: jobs[0].location,
        capacity: [jobs.length], // ⬅️ REQUIRED
      },
    ],
  };

  const res = await fetch(
    "https://api.openrouteservice.org/optimization",
    {
      method: "POST",
      headers: {
        Authorization: ORS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("ORS response:", err);
    throw new Error("ORS optimization failed");
  }

  return res.json();
};
