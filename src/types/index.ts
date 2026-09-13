export type FlowStatus = 'normal' | 'attention' | 'critical' | 'abnormal' | 'waiting' | 'Waiting for data';
export type AlertPriority = 'INFO' | 'ATTENTION' | 'CRITICAL' | 'FLOW ABNORMALITY';

export interface Bed {
    id: string;
    bedNumber: string;
    patientName: string;
    patientAge: number | string;
    patientGender: string;
    fluidType: string;
    bottleCapacityMl: number;
    remainingVolumeMl: number;
    remainingPercentage: number;
    dropRatePerMinute: number;
    flowStatus: FlowStatus;
    overallStatus: 'NORMAL' | 'ATTENTION' | 'CRITICAL' | 'ACTION REQUIRED' | 'READY / WAITING';
    estimatedMinutesRemaining: number | null;
    deviceId: string;
    deviceOnline: boolean;
    lastUpdated: string;
}

export interface Alert {
    id: string;
    bedId: string;
    type: string;
    priority: AlertPriority;
    message: string;
    remainingVolumeMl: number;
    estimatedMinutesRemaining: number | null;
    createdAt: string;
    acknowledged: boolean;
    acknowledgedBy?: string;
    acknowledgedByNurseId?: string;
    acknowledgedAt?: string;
    resolved: boolean;
    resolvedAt?: string;
}

export interface Device {
    deviceId: string;
    bedId: string;
    online: boolean;
    lastSeen: string;
    firmwareVersion: string;
    batteryLevel?: number;
}

export interface Nurse {
    id: string;
    name: string;
    role: string;
}
