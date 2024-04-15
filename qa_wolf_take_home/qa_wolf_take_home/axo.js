const axios = require("axios").default;

const options = {
  method: "POST",
  url: "https://api.edenai.run/v2/text/summarize",
  headers: {
    authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzRmZTdkYzItNzQ4Mi00ZWU0LWI4MDUtZDhiNGY2M2FiOTM3IiwidHlwZSI6ImFwaV90b2tlbiJ9.fCQnifCGu9vUB9cVZiuuosdbLh3voeh9InKW4PCsu60",
  },
  data: {
    output_sentences: 3,
    providers: "openai",
    text: url_body,
    language: "en",
    fallback_providers: "",
  },
};

axios
  .request(options)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
