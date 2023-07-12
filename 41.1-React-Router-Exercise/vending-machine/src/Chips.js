import React from "react";
import { Link } from "react-router-dom";

const Chips = () => {
    return (
        <div>
            <h1 className="title">Chips!</h1>
            <div className="product-container">
                <img className="product"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysvM1MYSU9cmEf16h_auqdBLVUinQioe7Kg&usqp=CAU"
                    alt="Pringles"
                />
                <img className="product"
                    src="https://cdn.gardengrocer.com/attachments/photos/high_res/605.png?6984"
                    alt="Ruffles"
                />
                <img className="product"
                    src="https://freepngimg.com/thumb/categories/954.png"
                    alt="Doritos"
                />
            </div>
            <Link className="back-text" to="/">Back</Link>
        </div>
    )
}

export default Chips;