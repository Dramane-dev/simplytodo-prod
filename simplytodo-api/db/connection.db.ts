import { db } from "./config.db";

export function connectionToDatabase(): void {
    db.authenticate()
        .then(() => console.log("Database connection established ✅"))
        .catch((err) => console.log(`Database connection error ❌ : ${err.message}`));
}
