const asyncHandler = require("express-async-handler")
//@Get all contacts
//@route GET/api/cylinders
//@access public

const getCylinders = asyncHandler(async(req, res) => {
    res.status(200).json({
        message: "Get all cylinders",
        status: "Active" 
    })
});

//@Get a cylinder by id
//@route GET/api/cylinders
//@access public

const getCylinderById = asyncHandler(async(req, res) => {
    res.status(200).json({
        message: `Cylinder with id ${req.params.id}`,
        status: "Active" 
    })
});

//@Post cylinders
//@route post/api/cylinders
//@access public
const postCylinders = asyncHandler(async(req, res) => {
    console.log("The request body is: ", req.body);
    const {cylinder_name, image_url, price, weight} = req.body
    if (!cylinder_name || !image_url || !price || !weight){
        res.status(400)
        throw new Error("All fields are required")
    }
    res.status(200).json({
        message: "Successfully added a new cylinder",
        status: "Active" 
    })
});

//@Update a cylinder
//@route put/api/cylinders
//@access public
const putCylinders = asyncHandler(async(req, res) => {
    res.status(201).json({
        message: `Update the cylinder for ${req.params.id}`,
        status: "Active"
    })
});

//@Update a cylinder
//@route put/api/cylinders
//@access public
const deleteCylinders = asyncHandler(async(req, res) => {
    res.status(201).json({
        message: `Seccessfully deleted the cylinder with id ${req.params.id}`,
        status: "Active"
    })
});

module.exports = {getCylinders,getCylinderById,postCylinders,putCylinders,deleteCylinders}
