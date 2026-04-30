// USERS
db.users.insertMany([
  { user_id: 1, name: "Rahul" },
  { user_id: 2, name: "Neha" }
]);

// CAMPAIGNS
db.campaigns.insertMany([
  { campaign_id: 101, title: "Medical Help", goal_amount: 50000, raised_amount: 0, deadline: new Date("2026-06-01"), status: "Active" }
]);

// DONATIONS
db.donations.insertMany([
  { donation_id: 1, campaign_id: 101, donor_id: 1, amount: 5000, message: "Support", date: new Date() },
  { donation_id: 2, campaign_id: 101, donor_id: 2, amount: 3000, message: "Best wishes", date: new Date() }
]);

// UPDATES
db.updates.insertOne({ update_id: 1, campaign_id: 101, text: "Update 1", date: new Date() });

// FETCH DONATIONS WITH USER DETAILS
db.donations.aggregate([
  { $match: { campaign_id: 101 } },
  { $lookup: { from: "users", localField: "donor_id", foreignField: "user_id", as: "donor" } },
  { $unwind: "$donor" }
]);

// UPDATE AMOUNT
db.campaigns.updateOne({ campaign_id: 101 }, { $inc: { raised_amount: 5000 } });

// UPDATE STATUS
db.campaigns.updateMany(
  { $expr: { $gte: ["$raised_amount", "$goal_amount"] } },
  { $set: { status: "Completed" } }
);

// AGGREGATIONS
db.donations.aggregate([{ $group: { _id: "$campaign_id", total: { $sum: "$amount" } } }]);

db.donations.aggregate([
  { $group: { _id: "$donor_id", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
]);

db.donations.aggregate([
  { $group: { _id: "$campaign_id", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);
