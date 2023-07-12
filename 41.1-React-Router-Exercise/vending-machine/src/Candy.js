import React from "react";
import { Link } from "react-router-dom";

const Candy = () => {
    return (
        <div>
            <h1 className="title">Candy!</h1>
            <div className="product-container">
                <img className="product"
                    src="https://www.milkywaybar.com/sites/g/files/fnmzdf631/files/migrate-product-files/navjcnc7rdmfi5v4b6qf.png"
                    alt="Milky Way"
                />
                <img className="product"
                    src="https://thumbs.dreamstime.com/b/starburst-fruit-chews-london-uk-june-th-unopened-pack-pictured-over-plain-white-background-th-june-73246905.jpg"
                    alt="Starburst"
                />
                <img className="product"
                    src="https://ourschoolnews.files.wordpress.com/2012/08/slideshow-snickers_476x35721.jpg"
                    alt="Snickers"
                />
            </div>
            <Link className="back-text" to="/">Back</Link>
        </div>
    )
}

export default Candy;