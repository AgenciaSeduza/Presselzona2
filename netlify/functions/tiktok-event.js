exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  const PIXEL_ID = "D4O8MMJC77UDQ79J0IL0";
  const ACCESS_TOKEN = "777dff0207ebd8ab566dcd1beb0100fff8c9b2f4";

  const payload = {
    pixel_code: PIXEL_ID,
    event: data.event,
    event_id: data.event_id,
    timestamp: new Date().toISOString(),
    context: {
      user_agent: event.headers["user-agent"],
      ip: event.headers["x-nf-client-ip"]  event.headers["x-forwarded-for"],
      page: { url: data.page_url }
    },
    properties: data.properties  {}
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
