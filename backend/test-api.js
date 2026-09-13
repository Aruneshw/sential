import http from 'http';

const postData = JSON.stringify({
    deviceId: "IVS-001",
    bedId: "BED-101",
    remainingVolumeMl: 360,
    remainingPercentage: 72,
    dropRatePerMinute: 18,
    flowStatus: "normal",
    timestamp: "2026-09-13T11:20:00+05:30"
});

const req = http.request(
    {
        hostname: 'localhost',
        port: 3001,
        path: '/api/sensor-data',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    },
    (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log('POST /api/sensor-data Response:', data);

            // Now test GET /api/beds
            http.get('http://localhost:3001/api/beds', (res2) => {
                let data2 = '';
                res2.on('data', chunk => data2 += chunk);
                res2.on('end', () => {
                    console.log('GET /api/beds Response:', data2);
                });
            });
        });
    }
);

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();
