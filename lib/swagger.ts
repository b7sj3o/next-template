import { createSwaggerSpec } from "next-swagger-doc"

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api/v1",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "My API",
        version: "1.0",
      },
    },
    apis: ["./app/api/v1/**/*.ts"],
  });
  return spec;
}