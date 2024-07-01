const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission and save to the database
app.post('/generate', (req, res) => {
    const { templateName, uiType, category, color, theme, background } = req.body;
    const htmlContent = generateHTMLContent(templateName, uiType, category, color, theme, background);

    // Save options to the database
    db.run('INSERT INTO user_options (templateName, uiType, category, color, theme, background, htmlContent) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [templateName, uiType, category, color, theme, background, htmlContent], function (err) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Database error');
            }
            res.send('Options saved successfully');
        });
});

// Fetch and display saved user options
app.get('/options', (req, res) => {
    db.all('SELECT * FROM user_options', [], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Database error');
        }
        res.json(rows);
    });
});

// Serve the view page
app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view.html'));
});

// Fetch and display all generated templates
app.get('/api/templates', (req, res) => {
    db.all('SELECT * FROM user_options', [], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Database error');
        }
        res.json(rows);
    });
});

// Route to clear all data from the database
app.post('/clear', (req, res) => {
    db.run('DELETE FROM user_options', [], function (err) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Database error');
        }
        console.log('All data cleared successfully');
        res.send('All data cleared successfully');
    });
});

// Route to delete a specific template by ID
app.delete('/api/templates/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM user_options WHERE id = ?', id, function (err) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Database error');
        }
        console.log(`Template with ID ${id} deleted successfully`);
        res.send(`Template with ID ${id} deleted successfully`);
    });
});

function generateHTMLContent(templateName, uiType, category, color, theme, background) {
    let htmlContent = `
    <div class="preview-content ${uiType} ${theme}" style="color:${color}; background-image:url('${background}');">
        <div class="template-header">${templateName}</div>`;

    switch (category) {
        case 'dashboard':
            htmlContent += `
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
            const calendarId = `calendar-${new Date().getTime()}`;
            htmlContent += `
                <div class="calendar" id="${calendarId}">
                    <div class="calendar-header">
                        <h5>${templateName} - Calendar</h5>
                    </div>
                </div>
                <script>
                    $(function() {
                        $('#${calendarId}').fullCalendar();
                    });
                </script>`;
            break;
        case 'messenger':
            htmlContent += `
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

    htmlContent += `</div>`;
    return htmlContent;
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
