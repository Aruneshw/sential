import http from 'http';

// Configurable values
const INTERVAL_MS = 2000;
const VOLUME_DECREASE_ML = 15;
const START_VOLUME_ML = 500;
const BASE_DROP_RATE = 18;

let remainingVolumeMl = START_VOLUME_ML;
let tickCount = 0;
let flowStatus = 'normal';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function runSimulation() {
    console.log('SIMULATOR STARTED');
    console.log('Device: IVS-001');
    console.log('Bed: BED-101\n');

    const interval = setInterval(() => {
        tickCount++;

        let dropRate = BASE_DROP_RATE + getRandomInt(-1, 1);

        // At tick 12 to 18 (24s to 36s), simulate abnormal flow
        if (tickCount >= 12 && tickCount <= 18) {
            flowStatus = 'abnormal';
            dropRate = getRandomInt(3, 8); // drastic drop in drop rate
        } else {
            flowStatus = 'normal';
        }

        remainingVolumeMl = Math.max(0, remainingVolumeMl - VOLUME_DECREASE_ML);
        const remainingPercentage = Math.round((remainingVolumeMl / START_VOLUME_ML) * 100);

        const payload = JSON.stringify({
            deviceId: 'IVS-001',
            bedId: 'BED-101',
            remainingVolumeMl,
            remainingPercentage,
            dropRatePerMinute: dropRate,
            flowStatus,
            timestamp: new Date().toISOString()
        });

        const req = http.request(
            {
                hostname: 'localhost',
                port: 3001,
                path: '/api/sensor-data',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(payload)
                }
            },
            (res) => {
                console.log(`Sending:`);
                console.log(`Remaining: ${remainingVolumeMl} mL`);
                console.log(`Percentage: ${remainingPercentage}%`);
                console.log(`Flow: ${dropRate} drops/min`);
                console.log(`Status: ${flowStatus}`);
                console.log(`HTTP: ${res.statusCode}\n`);
            }
        );

        req.on('error', (e) => {
            console.error(`Simulation request error: ${e.message}`);
        });

        req.write(payload);
        req.end();

        if (remainingVolumeMl <= 0) {
            clearInterval(interval);
            console.log('Bottle empty. Stopping simulation.');
            process.exit(0);
        }
    }, INTERVAL_MS);

    process.on('SIGINT', () => {
        clearInterval(interval);
        console.log('\nSimulator stopped by user.');
        process.exit(0);
    });
}

runSimulation();
