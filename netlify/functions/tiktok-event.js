exports.handler = async (event) => {
  try {
    // Aceita requisições OPTIONS (pré-flight CORS)
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        },
        body: ""
      };
    }

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Body vazio" })
      };
    }

    const data = JSON.parse(event.body);

    // ⚠️ CORREÇÃO PRINCIPAL DO ERRO 40002
    const finalPayload = {
      event_source_id: "D4O86QJC77UEBGID73OG", // <<< AQUI ESTÁ A CORREÇÃO
      ...data
    };

    const response = await fetch(
      "https://business-api.tiktok.com/open_api/v1.3/event/track/",
      {
        method: "POST",
        headers: {
          "Access-Token": "0322d0268e31b9d59d2690d697389a2aa704d681",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(finalPayload)
      }
    );

    const result = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        success: true,
        sent: finalPayload,
        tiktok_response: result
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
