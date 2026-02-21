const url = "http://localhost:4000/";

async function fetchGreeting() {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          greeting
        }
      `,
    }),
  });
  const { data } = await response.json();
  return data.greeting;
}

fetchGreeting().then((greeting) => {
  document.getElementById("greeting").textContent = greeting;
});
