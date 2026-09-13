import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory state: bedId -> state object
const sensorState = new Map();

// Helper to update deviceOnline status based on lastSeen (timeout = 60s)
const OFFLINE_TIMEOUT_MS = 60000;

function updateDeviceOnlineStatus() {
    const now = Date.now();
    for (const [bedId, state] of sensorState.entries()) {
        if (state.lastSeen && now - state.lastSeen > OFFLINE_TIMEOUT_MS) {
            sensorState.set(bedId, { ...state, deviceOnline: false });
        }
    }
}

// Ensure online status is periodically evaluated
setInterval(updateDeviceOnlineStatus, 5000);

// HEALTH CHECK
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// POST SENSOR DATA
app.post('/api/sensor-data', (req, res) => {
    const {
        deviceId,
        bedId,
        remainingVolumeMl,
        remainingPercentage,
        dropRatePerMinute,
        flowStatus,
        timestamp
    } = req.body;

    // Validation
    if (
        !deviceId ||
        !bedId ||
        remainingVolumeMl === undefined ||
        remainingPercentage === undefined ||
        dropRatePerMinute === undefined ||
        !flowStatus ||
        !timestamp
    ) {
        return res.status(400).json({ error: 'Malformed request. Missing required fields.' });
    }

    // Save to memory
    const stateUpdate = {
        deviceId,
        bedId,
        remainingVolumeMl,
        remainingPercentage,
        dropRatePerMinute,
        flowStatus,
        timestamp,
        lastSeen: Date.now(),
        deviceOnline: true
    };

    sensorState.set(bedId, stateUpdate);

    res.status(200).json({ success: true });
});

// GET ALL BEDS
app.get('/api/beds', (req, res) => {
    updateDeviceOnlineStatus();
    const beds = Array.from(sensorState.values());
    res.json(beds);
});

// GET ONE BED
app.get('/api/beds/:bedId', (req, res) => {
    updateDeviceOnlineStatus();
    const bedId = req.params.bedId;
    const state = sensorState.get(bedId);
    if (state) {
        res.json(state);
    } else {
        res.status(404).json({ error: 'Bed not found' });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Backend server running on http://localhost:${PORT}`);
    });
}

export default app;
