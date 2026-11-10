import {prisma} from "../config/db.js";

const insertProduct = async(req, res) => {
    const {name, price} = req.body;

    const product = await prisma.product.create({
        data: {
            name, price,
        },
    });

    res.status(201).json({
        status: "success",
        data: {
            product: {
                id: product.id,
                name: product.name,
                price: product.price,
            },
        }
    })
}

// disini tadi yang code getProduct yg udh dibikin (aku kebetulan ngga punya hehe)

// update--------------------------
const updateProduct = async(req, res) => {
    const id = Number(req.params.id);
    const {name, price} = req.body;

    try {
        const existing = await prisma.product.findUnique({
            where: {id},
        });

        if (!existing) {
            return res.status(404).json({
                status: "fail",
                message: "Produk tidak ditemukan",
            });
        }

        const product = await prisma.product.update({
            where: {id},
            data: {name, price},
        });

        res.status(200).json({
            status: "success",
            data: {
                product: {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                },
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

// update---------------------------
const deleteProduct = async(req, res) => {
    const id = Number(req.params.id);

    try {
        const existing = await prisma.product.findUnique({
            where: {id},
        });

        if (!existing) {
            return res.status(404).json({
                status: "fail",
                message: "Produk tidak ditemukan",
            });
        }

        await prisma.product.delete({
            where: {id},
        });

        res.status(200).json({
            status: "success",
            message: "Produk berhasil dihapus",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

// update-------------------
export {insertProduct, updateProduct, deleteProduct};
