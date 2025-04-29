import { useState } from "react";
import { ethers } from "ethers";

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether');
};

const CreateProduct = ({ dappazon, provider, addNewProduct }) => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [stock, setStock] = useState("");

    const createProductHandler = async () => {

        const signer = provider.getSigner();
        const transaction = await dappazon
            .connect(signer)
            .addProduct(name, category, image, tokens(price), rating, stock);
        await transaction.wait();

        const newProduct = {
            name,
            category,
            image,
            price: tokens(price),
            rating,
            stock,
        };

        addNewProduct(newProduct);
    };

    // CSS styles
    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            boxSizing: "border-box",
        },
        title: {
            fontSize: "2rem",
            marginBottom: "20px",
            color: "#333",
        },
        input: {
            width: "100%",
            maxWidth: "400px",
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "1rem",
        },
        button: {
            width: "100%",
            maxWidth: "400px",
            padding: "10px",
            marginTop: "20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
        },
        buttonHover: {
            backgroundColor: "#0056b3",
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Create Product</h2>
            <input
                type="text"
                placeholder="Name"
                style={styles.input}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Category"
                style={styles.input}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                type="text"
                placeholder="Image URL"
                style={styles.input}
                onChange={(e) => setImage(e.target.value)}
            />
            <input
                type="text"
                placeholder="Price (ETH)"
                style={styles.input}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="number"
                placeholder="Rating"
                style={styles.input}
                onChange={(e) => setRating(e.target.value)}
            />
            <input
                type="number"
                placeholder="Stock"
                style={styles.input}
                onChange={(e) => setStock(e.target.value)}
            />
            <button
                style={styles.button}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                onClick={createProductHandler}
            >
                Add Product
            </button>
        </div>
    );
};

export default CreateProduct;