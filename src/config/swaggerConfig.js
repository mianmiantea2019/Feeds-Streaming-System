const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "NewsFeed",
			version: "1.0.0",
			description: "MERN Redis Feeds API",
		},
		servers: [
			{
				url: "",
			},
		],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
	},
	apis: ["./src/routes/*.js"],
};

export default options;