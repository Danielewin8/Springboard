import React, { useState } from "react";
import { Card, CardBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom";

function NewFoodForm({ type, addSnack, addDrink, setSnacks, setDrinks }) {
    const INITIAL_STATE = {
        name: "",
        description: "",
        recipe: "",
        serve: "",
    };

    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const history = useHistory();
    const newItem = { ...formData, id: formData.name.toLowerCase() };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type === "snack") {
            await addSnack(newItem, setSnacks);
            history.push("/snacks")
        } else if (type === "drink") {
            await addDrink(newItem, setDrinks);
            history.push("/drinks")
        }
        setFormData(INITIAL_STATE);
    };

    return (
        <section className="col-md-4">
            <Card>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="recipe">Recipe</Label>
                            <Input
                                type="text"
                                name="recipe"
                                id="recipe"
                                value={formData.recipe}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="serve">Serve</Label>
                            <Input
                                type="text"
                                name="serve"
                                id="serve"
                                value={formData.serve}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <Button type="submit" color="light">
                            Add {type === "snack" ? "Snack" : "Drink"}
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </section>
    );
}

export default NewFoodForm;

