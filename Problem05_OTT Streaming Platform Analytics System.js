// USERS
db.users.insertOne({ user_id: 1, name: "Rahul" });

// CONTENT
db.content.insertMany([
  { content_id: 1, title: "Movie1", genre: "Action" },
  { content_id: 2, title: "Movie2", genre: "Drama" }
]);

// WATCH HISTORY
db.watchhistory.insertMany([
  { user_id: 1, content_id: 1, duration: 120, timestamp: new Date() },
  { user_id: 1, content_id: 2, duration: 60, timestamp: new Date() }
]);

// RATINGS
db.ratings.insertOne({ user_id: 1, content_id: 1, rating: 5 });

// FETCH WATCH HISTORY
db.watchhistory.aggregate([
  { $match: { user_id: 1 } },
  { $lookup: { from: "content", localField: "content_id", foreignField: "content_id", as: "content" } },
  { $unwind: "$content" }
]);

// ADD WATCH ACTIVITY
db.watchhistory.insertOne({ user_id: 1, content_id: 1, duration: 30, timestamp: new Date() });

// ADD RATING
db.ratings.insertOne({ user_id: 1, content_id: 2, rating: 4 });

// AGGREGATION
db.watchhistory.aggregate([
  { $group: { _id: "$content_id", total_views: { $sum: 1 } } },
  { $sort: { total_views: -1 } }
]);

db.watchhistory.aggregate([
  { $group: { _id: "$user_id", avg_watch: { $avg: "$duration" } } }
]);

db.watchhistory.aggregate([
  { $lookup: { from: "content", localField: "content_id", foreignField: "content_id", as: "c" } },
  { $unwind: "$c" },
  { $group: { _id: "$c.genre", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);
