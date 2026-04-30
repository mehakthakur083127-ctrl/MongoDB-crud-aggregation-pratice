// STUDENTS
db.students.insertOne({ student_id: 1, name: "Rahul" });

// EXAMS
db.exams.insertOne({ exam_id: 101, title: "Math Test" });

// QUESTIONS
db.questions.insertMany([
  { question_id: 1, exam_id: 101, correct_answer: "A" }
]);

// RESPONSES
db.responses.insertOne({ student_id: 1, exam_id: 101, answers: [{ qid: 1, ans: "A" }], score: 0 });

// PROCTOR LOGS
db.proctorlogs.insertOne({ student_id: 1, exam_id: 101, event: "Tab Switch", flagged: false });

// FETCH RESPONSES
db.responses.find({ student_id: 1, exam_id: 101 });

// UPDATE SCORE
db.responses.updateOne({ student_id: 1 }, { $set: { score: 1 } });

// FLAG SUSPICIOUS
db.proctorlogs.updateMany({ event: "Tab Switch" }, { $set: { flagged: true } });

// AGGREGATION
db.responses.aggregate([
  { $group: { _id: "$student_id", avg: { $avg: "$score" } } },
  { $sort: { avg: -1 } }
]);

db.proctorlogs.aggregate([
  { $match: { flagged: true } },
  { $group: { _id: "$student_id", count: { $sum: 1 } } }
]);

db.responses.aggregate([
  { $group: { _id: "$exam_id", avg_score: { $avg: "$score" } } }
]);
