import app from "./app";
import { port } from "./config/variables";
import connect from "./config/database";

app.listen(port, () => {
   console.log(`Server running on port ${port}`.yellow);

   connect();
});
