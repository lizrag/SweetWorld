import { __dirname } from "../utils.js";

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SweetWorld",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["../routes/*.js"]
};
export default swaggerSpec;
