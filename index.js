<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WhatsApp Bot</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; background: black; color: white; }
        .container { margin-top: 50px; }
        input, button { padding: 10px; margin: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Pair Your WhatsApp</h2>
        <input type="text" id="number" placeholder="Enter your WhatsApp Number">
        <button onclick="getCode()">Get Pairing Code</button>
        <p id="pair_code"></p>

        <h2>Send Message</h2>
        <input type="text" id="target" placeholder="Enter Target Number / Group ID">
        <input type="text" id="message" placeholder="Enter Message">
        <select id="is_group">
            <option value="false">Send to Number</option>
            <option value="true">Send to Group</option>
        </select>
        <button onclick="sendMessage()">Send</button>
        <p id="status"></p>
    </div>

    <script>
        async function getCode() {
            let num = document.getElementById("number").value;
            if (!num) {
                document.getElementById("pair_code").innerText = "Enter a valid number";
                return;
            }
            document.getElementById("pair_code").innerText = "Generating Pairing Code...";
            let res = await fetch(`/code?number=${num}`);
            let data = await res.json();
            document.getElementById("pair_code").innerText = "Pair Code: " + (data.code || "Error");
        }

        async function sendMessage() {
            let number = document.getElementById("number").value;
            let target = document.getElementById("target").value;
            let message = document.getElementById("message").value;
            let isGroup = document.getElementById("is_group").value === "true";

            if (!number || !target || !message) {
                document.getElementById("status").innerText = "Please fill all fields";
                return;
            }

            document.getElementById("status").innerText = "Sending...";
            let res = await fetch("/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ number, target, message, is_group: isGroup })
            });
            let data = await res.json();
            document.getElementById("status").innerText = data.status || "Error";
        }
    </script>
</body>
</html>

