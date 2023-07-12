import React from "react";
import { Link } from "react-router-dom";

const Drinks = () => {
    return (
        <div>
            <h1 className="title">Drinks!</h1>
            <div className="product-container">
                <img className="product"
                    src="https://i5.walmartimages.com/asr/90e2866c-0fe7-498e-a5b9-7d5230ffee10.7e305c0c3853c5eac918626757ca8a22.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
                    alt="Coca-Cola"
                />
                <img className="product"
                    src="https://phorcys-static.ewg.org/kwikee/049/000/050/257.jpg"
                    alt="Fanta"
                />
                <img className="product"
                    src="https://storage.googleapis.com/images-sof-prd-9fa6b8b.sof.prd.v8.commerce.mi9cloud.com/product-images/detail/00054900000073.jpg"
                    alt="Dr Pepper"
                />
            </div>
            <Link className="back-text" to="/">Back</Link>
        </div>
    )
}

export default Drinks;