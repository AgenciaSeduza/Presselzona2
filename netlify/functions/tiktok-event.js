import fetch from "node-fetch";

  // ✅ Só aceita POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  try {
    const data = JSON.parse(event.body);

    if (!data.event || !data.event_time) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Evento inválido" })
      };
    }

    const response = await fetch("https://business-api.tiktok.com/open_api/v1.3/event/track/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": "0322d0268e31b9d59d2690d697389a2aa704d681"
      },
      body: JSON.stringify(data)
    });

    const result = await response.text();

    return {
      statusCode: 200,
      body: result
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
