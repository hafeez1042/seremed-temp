import swaggerJsdoc from "swagger-jsdoc";

const schemas = require("@quadspire/sd-shared/schema.json");

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Quadspire API with Swagger",
      version: "1.0.0",
      description:
        "This is the CRUD API application made with ExpressJS and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Quadspire Inc.",
        url: "https://www.quadspire.com",
        email: "info@quadspire.com",
      },
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3100/v1",
      },
      // {
      //   url: `${baseUrl}/on-boarding/seller`,
      // },
      // {
      //   url: `${baseUrl}/on-boarding/customer`,
      // },
      // {
      //   url: "http://localhost:3000/industries",
      // },
      // {
      //   url: "http://localhost:3000/api/productgroups",
      // },

      // {
      //   url: "http://localhost:3000/api/productvariants",
      // },

      // {
      //   url: "http://localhost:3000/api/productmodels",
      // },

      // {
      //   url: "http://localhost:3000/api/productcategories",
      // },

      // {
      //   url: "http://localhost:3000/api/productsubcategories",
      // },
    ],
  },
  apis: ["./src/routes/**/*.ts"],
};

const swaggerSpec = { ...swaggerJsdoc(options), ...schemas };

export default swaggerSpec;
