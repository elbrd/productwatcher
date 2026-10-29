import { productWatch } from "./src/jobs/productWatch.jobs.js";

const result = await productWatch();
console.log(result);
