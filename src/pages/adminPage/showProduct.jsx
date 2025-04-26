import React, { useEffect, useState } from 'react';
import { getAllProduct } from '../../util/api';
import { use } from 'react';

const ShowProduct = () => {
    const [products, setProducts] = useState([]);
    const getAllProducts = async () => {
        const data = await getAllProduct();
        setProducts(data);
    }
    useEffect(() => {
        getAllProducts()
    },
        []);
    console.log("products", products);
    return (
        <div className="sb-nav-fixed">
            <div id="layoutSidenav">
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Manage Products</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item">
                                    <a href="/admin">Dashboard</a>
                                </li>
                                <li className="breadcrumb-item active">Products</li>
                            </ol>
                            <div className="mt-5">
                                <div className="row">
                                    <div className="col-12 mx-auto">
                                        <div className="d-flex justify-content-between">
                                            <h3>Table Products</h3>
                                            <a href="/createproduct" className="btn btn-primary">Create a Product</a>
                                        </div>
                                        <hr />
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Factory</th>
                                                    <th>Action</th>
                                                    <th>Image</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map((product) => (
                                                    <tr key={product.id}>
                                                        <th>{product._id}</th>
                                                        <td>{product.name}</td>
                                                        <td>{product.price}</td>
                                                        <td>{product.category}</td>
                                                        <td className="text-center">
                                                            <img src={`${import.meta.env.VITE_BACKEND_URL}/routes/productLaptop/${product.image}`} alt="Product"
                                                                style={{ width: "150px", height: "150px", objectFit: "cover" }} />
                                                        </td>


                                                        <td>
                                                            <a href={`/admin/product/${product.id}`} className="btn btn-success">View</a>
                                                            <a href={`/admin/product/update/${product.id}`} className="btn btn-warning mx-2">Update</a>
                                                            <a href={`/admin/product/delete/${product.id}`} className="btn btn-danger">Delete</a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer>
                        {/* You can include your footer component here */}
                    </footer>
                </div>
            </div >

            <script src="js/scripts.js"></script>
        </div >
    );
};

export default ShowProduct;
