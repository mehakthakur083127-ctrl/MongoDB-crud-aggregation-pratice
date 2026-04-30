// VEHICLES
db.vehicles.insertMany([
  { vehicle_id: 1, type: "Car", location: "Delhi", available: true },
  { vehicle_id: 2, type: "Bike", location: "Delhi", available: true }
]);

// CUSTOMERS
db.customers.insertOne({ customer_id: 1, name: "Rahul" });

// RENTALS
db.rentals.insertMany([
  { rental_id: 1, vehicle_id: 1, customer_id: 1, start: new Date("2026-05-01"), end: new Date("2026-05-05"), status: "Booked" }
]);

// MAINTENANCE
db.maintenance.insertOne({ record_id: 1, vehicle_id: 1, issue: "Oil Change", date: new Date() });

// FIND AVAILABLE VEHICLES
db.vehicles.find({ location: "Delhi", available: true });

// UPDATE RENTAL STATUS
db.rentals.updateOne({ rental_id: 1 }, { $set: { status: "Returned" } });

// UPDATE VEHICLE AVAILABILITY
db.vehicles.updateOne({ vehicle_id: 1 }, { $set: { available: true } });

// AGGREGATION
db.rentals.aggregate([
  { $lookup: { from: "vehicles", localField: "vehicle_id", foreignField: "vehicle_id", as: "vehicle" } },
  { $unwind: "$vehicle" },
  { $group: { _id: "$vehicle.type", revenue: { $sum: 1000 } } }
]);

db.rentals.aggregate([
  { $group: { _id: "$vehicle_id", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);

db.maintenance.aggregate([
  { $group: { _id: "$vehicle_id", count: { $sum: 1 } } },
  { $match: { count: { $gt: 1 } } }
]);
