exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  const PIXEL_ID = "D4O8U9JC77UA1JCQ5P30";
  const ACCESS_TOKEN = "df349851296e7145f67406e2558c06c72b4ad2e9";

  const payload = {
    pixel_code: PIXEL_ID,
    event: data.event,
    event_id: data.event_id || data.event + "_" + Date.now(),
    timestamp: new Date().toISOString(),
    context: {
      user_agent: event.headers["user-agent"],
      page: { url: data.page_url || event.headers.referer }
    },
    properties: data.properties || {}
  };

  try {
    const res = await fetch("https://business-api.tiktok.com/open_api/v1.3/event/track/", {
      method: "POST",
      headers: {
        "Access-Token": ACCESS_TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
