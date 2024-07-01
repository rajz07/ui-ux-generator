document.getElementById('generatorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const templateName = document.getElementById('templateName').value;
    const uiType = document.getElementById('uiType').value;
    const category = document.getElementById('category').value;
    const color = document.getElementById('color').value;
    const theme = document.getElementById('theme').value;
    const background = document.getElementById('background').value;

    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ templateName, uiType, category, color, theme, background })
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            updatePreview(templateName, uiType, category, color, theme, background);
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('clearData').addEventListener('click', function () {
    fetch('/clear', {
        method: 'POST',
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            alert(data);
        })
        .catch(error => console.error('Error:', error));
});

function updatePreview(templateName, uiType, category, color, theme, background) {
    const preview = document.getElementById('preview');
    preview.innerHTML = ''; // Clear previous content

    // Apply theme to the preview only
    if (theme === 'dark') {
        preview.classList.add('dark-mode');
    } else {
        preview.classList.remove('dark-mode');
    }

    // Apply background image
    if (background) {
        preview.style.backgroundImage = `url('${background}')`;
    } else {
        preview.style.backgroundImage = 'none';
    }

    // Create preview content
    const previewContent = document.createElement('div');
    previewContent.className = `preview-content ${uiType} ${theme}`;
    previewContent.style.color = color; // Apply text color

    // Add category-specific elements
    switch (category) {
        case 'dashboard':
            previewContent.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        ${templateName} - Dashboard
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">CSOO7213 Assignment 2</h5>
                        <p class="card-text">Welcome to the CSOO7213 Service Oriented Architecture Using Web Service dashboard. 
                        This platform provides a comprehensive overview and resources for mastering service-oriented architecture (SOA) and web services.
                        click below to redirect to eBwise</p>
                        <a href="https://ebwise.mmu.edu.my/login/index.php" class="btn btn-${color}">eBwise</a>
                    </div>
                </div>`;
            break;
        case 'calendar':
            previewContent.innerHTML = `
                <div class="calendar" id="calendar-${new Date().getTime()}">
                    <div class="calendar-header">
                        <h5>${templateName} - Calendar</h5>
                    </div>
                </div>`;
            break;
        case 'messenger':
            previewContent.innerHTML = `
                <div class="messenger">
                    <div class="messenger-header">
                        <h5>${templateName} - Messenger</h5>
                    </div>
                    <div class="messenger-body">
                        <div class="message">
                            <p class="message-text">Hello Kavin, Do we have class today? </p>
                        </div>
                        <div class="message">
                            <p class="message-text">Hi Arun. Yes, we do?</p>
                        </div>
                        <div class="message">
                            <p class="message-text">Great! thank you!</p>
                        </div>
                    </div>
                </div>`;
            break;
    }

    // Append the preview content
    preview.appendChild(previewContent);

    // Initialize the calendar if the category is calendar
    if (category === 'calendar') {
        const calendarId = previewContent.querySelector('.calendar').id;
        $(`#${calendarId}`).fullCalendar();
    }
}

document.getElementById('clearData').addEventListener('click', function () {
    fetch('/clear', {
        method: 'POST',
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            alert(data);
        })
        .catch(error => console.error('Error:', error));
});
