
export const copyText = (innerHtml) => {
    // Check if the window and navigator objects are available (client-side only)
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const parser = new DOMParser();
      const doc = parser.parseFromString(innerHtml, "text/html");
      const textContent = doc.body.innerText;
  
      navigator.clipboard
        .writeText(textContent)
        .then(() => {
          alert("Text copied!");
        })
        .catch((err) => {
          alert("Something went wrong, text not copied");
        });
    } else {
      console.error("Clipboard API is not available on the server.");
    }
  };
  