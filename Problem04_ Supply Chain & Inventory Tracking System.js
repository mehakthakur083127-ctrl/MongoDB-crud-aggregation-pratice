// SUPPLIERS
db.suppliers.insertOne({ supplier_id: 1, name: "ABC Corp" });

// PRODUCTS
db.products.insertOne({ product_id: 1, name: "Item1" });

// WAREHOUSES
db.warehouses.insertMany([
  { warehouse_id: 1, location: "Delhi" },
  { warehouse_id: 2, location: "Mumbai" }
]);

// INVENTORY
db.inventory.insertMany([
  { product_id: 1, warehouse_id: 1, stock: 50 },
  { product_id: 1, warehouse_id: 2, stock: 30 }
]);

// SHIPMENTS
db.shipments.insertOne({ shipment_id: 1, product_id: 1, status: "Delivered", delay: 2 });

// FETCH STOCK
db.inventory.find({ product_id: 1 });

// UPDATE INVENTORY
db.inventory.updateOne({ warehouse_id: 1 }, { $inc: { stock: -10 } });

// AGGREGATION
db.inventory.aggregate([
  { $match: { stock: { $lt: 40 } } }
]);

db.shipments.aggregate([
  { $group: { _id: "$supplier_id", avg_delay: { $avg: "$delay" } } }
]);

db.shipments.aggregate([
  { $match: { delay: { $gt: 1 } } }
]);
