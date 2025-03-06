function generateFavicon(unreadCount) {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");

    // Transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears instead of filling

    // Draw unread count
    ctx.fillStyle = "#000000";
    ctx.font = "bold 30px Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Limit the unread count to 99+
    const displayCount = unreadCount > 99 ? "99+" : unreadCount;

    ctx.fillText(displayCount, 16, 16);

    return canvas.toDataURL("image/png");
}

function updateFavicon() {
    const favicon = document.querySelector("link[rel*='icon']");
    const titleMatch = document.title.match(/\((\d+)\)/); // Extract unread count from title
    const unreadCount = titleMatch ? parseInt(titleMatch[1]) : 0;

    if (!favicon) return;

    const newFavicon = document.createElement("link");
    newFavicon.rel = "icon";
    newFavicon.type = "image/png";
    newFavicon.href = unreadCount ? generateFavicon(unreadCount) : favicon.href;

    document.head.removeChild(favicon);
    document.head.appendChild(newFavicon);

    // Set the title without the unread count
    document.title = "Gmail";
}

// Run immediately and check every 3 seconds
updateFavicon();
setInterval(updateFavicon, 3000);