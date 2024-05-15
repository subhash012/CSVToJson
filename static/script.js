document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('/convert', {
        method: 'POST',
        body: formData
    });
    const jsonData = await response.json();
    const jsonResultDiv = document.getElementById('jsonResult');
    jsonResultDiv.innerHTML = `<textarea id="jsonTextarea" rows="20" cols="100">${JSON.stringify(jsonData, null, 2)}</textarea>`;

    // Show the copy button after conversion
    document.getElementById('copyButton').style.display = 'inline-block';
    // Show the download button after conversion
    document.getElementById('downloadButton').style.display = 'inline-block';
});

document.getElementById('fileInput').addEventListener('change', function() {
    const fileName = this.files[0].name;
    document.getElementById('fileName').textContent = `${fileName}`;
});

document.getElementById('copyButton').addEventListener('click', function() {
    const textarea = document.getElementById('jsonTextarea');
    textarea.select();
    document.execCommand('copy');
    alert('JSON data copied to clipboard!');
});

document.getElementById('downloadButton').addEventListener('click', async function() {
    const jsonData = document.getElementById('jsonTextarea').value;
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});