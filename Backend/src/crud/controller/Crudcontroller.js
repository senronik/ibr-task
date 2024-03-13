const Product = require("../models/Crud");
const csvParser = require("csv-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

exports.addProduct = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User Not found" });
    }
    req.body["userId"] = userId;
    const data = new Product({
      ...req.body,
      name: req.body.name?.toLowerCase(),
      description: req.body.description?.toLowerCase(),
    });
    const response = await data.save();

    return res
      .status(201)
      .json({ response, message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Interenal Server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ error: "Not found" });
    }
    product.updatedAt = Date.now();
    const newData = req.body;
    const response = await Product.findByIdAndUpdate(id, newData, {
      new: true,
    });
    return res.status(200).json({ response, message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllproducts = async (req, res) => {
  let { page, limit, query, minPrice, maxPrice, type, sort, asc,exportCsv } = req.query;
  try {
    let filter = {};
    if (!req.headers.role === "admin") {
      return res.status(400).json({ error: "" });
    }
    if (type) {
      filter.type = type;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    //   if (query) {
    //     if (Array.isArray(query)) {
    //         filter.name = { $in: query.map(value => new RegExp(value, 'i')) };
    //     }
    //     else {
    //         filter.name = { $regex: new RegExp(query, 'i') };
    //     }
    // }
    let response;
    if (Object.keys(filter).length >= 0) {
      let regex;
      if (query) {
        if (Array.isArray(query)) {
          regex = { $in: query.map((value) => new RegExp(value, "i")) };
        } else {
          regex = { $regex: new RegExp(query, "i") };
        }
        response = await Product.find({
          $and: [
            filter,
            {
              $or: [{ name: regex }, { description: regex }, { type: regex }],
            },
          ],
        }).sort({ createdAt: -1 });
      } else {
        response = await Product.find(filter).sort({ createdAt: -1 });
      }
    } else {
      response = await Product.find({}).sort({ createdAt: -1 });
    }

    let allProducts = [...response];
    let sortedProducts = [...allProducts];
    if (sort === "name") {
      sortedProducts.sort((a, b) => {
        return asc === "true"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
    } else if (sort === "description") {
      sortedProducts.sort((a, b) => {
        return asc === "true"
          ? a.description.localeCompare(b.description)
          : b.description.localeCompare(a.description);
      });
    } else if (sort === "type") {
      sortedProducts.sort((a, b) => {
        return asc === "true"
          ? a.type.localeCompare(b.type)
          : b.type.localeCompare(a.type);
      });
    } else if (sort === "price") {
      sortedProducts.sort((a, b) => {
        return asc === "true" ? a.price - b.price : b.price - a.price;
      });
    }
    if(exportCsv){
      try {
        const products = await Product.find({});
        if (!products) {
          return res
            .status(404)
            .json({ success: false, message: "No data found to export" });
        }
        const csvWriter = createCsvWriter({
          path: "products.csv",
          header: [
            { id: "name", title: "name" },
            { id: "type", title: "type" },
            { id: "description", title: "description" },
            { id: "price", title: "price" },
          ],
        });
        const records = products.map((product) => ({
          name: product.name,
          price: product.price,
          description: product.description,
          type: product.type,
        }));
        await csvWriter.writeRecords(records);
        res.download("products.csv");
      } catch (error) {
        console.error("Error in exxporting csv", error);
        res.status(500).send("Error exporting CSV data: " + error.message);
      }
    }
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let paginatedProducts = sortedProducts.slice(startIndex, endIndex);

    return res.status(200).json({
      data: paginatedProducts,
      paging: {
        totalPages: Math.ceil(allProducts.length / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.importCsv = async (req, res) => {
  const csvFileBuffer = req.file;
  try {
    const userId = new mongoose.Types.ObjectId(req.headers.id);
    const csvString = csvFileBuffer.path;
    const results = [];
    console.log(csvString);
    fs.createReadStream(csvString)
      .pipe(csvParser())
      .on("data", (data) => {
        const value = Object.values(data);
        return results.push({
          name: value[0],
          type: value[1],
          description: value[2],
          price: Number(value[3]),
          userId,
        });
      })
      .on("end", async () => {
        await Product.insertMany(results);
        res.status(200).send("CSV data imported successfully");
      })
      .on("error", (error) => {
        console.error("Error parsing CSV file:", error);
        res.status(500).send("Error parsing CSV file: " + error.message);
      });
  } catch (error) {
    console.error("Error importing CSV data:", error);
    res.status(500).send("Error importing CSV data: " + error.message);
  }
};

exports.exportCsv = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "No data found to export" });
    }
    const csvWriter = createCsvWriter({
      path: "products.csv",
      header: [
        { id: "name", title: "name" },
        { id: "type", title: "type" },
        { id: "description", title: "description" },
        { id: "price", title: "price" },
      ],
    });
    const records = products.map((product) => ({
      name: product.name,
      price: product.price,
      description: product.description,
      type: product.type,
    }));
    await csvWriter.writeRecords(records);
    res.download("products.csv");
  } catch (error) {
    console.error("Error in exxporting csv", error);
    res.status(500).send("Error exporting CSV data: " + error.message);
  }
};
