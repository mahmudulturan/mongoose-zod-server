import app from "./app";

const port = 5000;

app.listen(port, () => {
    console.log(`Mongoose Zod Server is running on port ${port}`);
});