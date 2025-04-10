const app = require('./app');
const port = 3000;

try {
    app.listen(port, () => console.log(`server running on port ${port}`));
} catch (me) {
    throw me;
};