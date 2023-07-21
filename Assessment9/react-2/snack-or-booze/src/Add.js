import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

const addSnack = async (newSnack, setSnacks) => {
    try {
        // Make a POST request to the API to add the new snack
        await axios.post(`${BASE_API_URL}/snacks`, newSnack);

        // Update the state to include the new snack
        setSnacks((prevSnacks) => [...prevSnacks, newSnack]);
    } catch (error) {
        console.error("Error adding snack:", error);
    }
};

const addDrink = async (newDrink, setDrinks) => {
    try {
        // Make a POST request to the API to add the new drink
        await axios.post(`${BASE_API_URL}/drinks`, newDrink);

        // Update the state to include the new drink
        setDrinks((prevDrinks) => [...prevDrinks, newDrink]);
    } catch (error) {
        console.error("Error adding drink:", error);
    }
};

export { addSnack, addDrink };