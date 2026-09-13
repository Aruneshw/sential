import { Bed, Alert, Nurse } from '../types';

export const MOCK_NURSES: Nurse[] = [
    { id: "NURSE-001", name: "Kavya R", role: "Senior Nurse" },
    { id: "NURSE-002", name: "Priya S", role: "Staff Nurse" },
    { id: "NURSE-003", name: "Arun K", role: "Staff Nurse" },
    { id: "NURSE-004", name: "Divya M", role: "Staff Nurse" },
    { id: "NURSE-005", name: "Sanjana P", role: "Staff Nurse" }
];

export const FLOW_THRESHOLDS = {
    normalMin: 15,
    normalMax: 25,
    attentionMin: 8,
    abnormalDropRate: 5
};

export const MOCK_BEDS: Bed[] = [
    {
        id: 'b1',
        bedNumber: 'BED 101',
        patientName: 'Ramesh Kumar',
        patientAge: 45,
        patientGender: 'Male',
        fluidType: 'NS 0.9%',
        bottleCapacityMl: 500,
        remainingVolumeMl: 360,
        remainingPercentage: 72,
        dropRatePerMinute: 18,
        flowStatus: 'normal',
        overallStatus: 'NORMAL',
        estimatedMinutesRemaining: 48,
        deviceId: 'IVS-101',
        deviceOnline: true,
        lastUpdated: new Date().toISOString()
    },
    {
        id: 'b2',
        bedNumber: 'BED 102',
        patientName: 'Suresh Babu',
        patientAge: 52,
        patientGender: 'Male',
        fluidType: 'NS 0.9%',
        bottleCapacityMl: 500,
        remainingVolumeMl: 155,
        remainingPercentage: 31,
        dropRatePerMinute: 17,
        flowStatus: 'attention',
        overallStatus: 'ATTENTION',
        estimatedMinutesRemaining: 26,
        deviceId: 'IVS-102',
        deviceOnline: true,
        lastUpdated: new Date().toISOString()
    },
    {
        id: 'b3',
        bedNumber: 'BED 103',
        patientName: 'Meena R',
        patientAge: 38,
        patientGender: 'Female',
        fluidType: 'DNS',
        bottleCapacityMl: 500,
        remainingVolumeMl: 45,
        remainingPercentage: 9,
        dropRatePerMinute: 16,
        flowStatus: 'critical',
        overallStatus: 'CRITICAL',
        estimatedMinutesRemaining: 7,
        deviceId: 'IVS-103',
        deviceOnline: true,
        lastUpdated: new Date().toISOString()
    },
    {
        id: 'b4',
        bedNumber: 'BED 104',
        patientName: 'Arun Kumar',
        patientAge: 62,
        patientGender: 'Male',
        fluidType: 'NS 0.9%',
        bottleCapacityMl: 500,
        remainingVolumeMl: 320,
        remainingPercentage: 64,
        dropRatePerMinute: 3,
        flowStatus: 'abnormal',
        overallStatus: 'ACTION REQUIRED',
        estimatedMinutesRemaining: 300,
        deviceId: 'IVS-104',
        deviceOnline: true,
        lastUpdated: new Date().toISOString()
    },
    {
        id: 'b5',
        bedNumber: 'BED 105',
        patientName: 'Lakshmi Devi',
        patientAge: 29,
        patientGender: 'Female',
        fluidType: 'RL',
        bottleCapacityMl: 500,
        remainingVolumeMl: 320,
        remainingPercentage: 64,
        dropRatePerMinute: 19,
        flowStatus: 'normal',
        overallStatus: 'NORMAL',
        estimatedMinutesRemaining: 48,
        deviceId: 'IVS-105',
        deviceOnline: true,
        lastUpdated: new Date().toISOString()
    }
];

export const MOCK_ALERTS: Alert[] = [
    {
        id: 'a1',
        bedId: 'b3',
        type: 'LOW_VOLUME',
        priority: 'CRITICAL',
        message: 'IV critically low',
        remainingVolumeMl: 45,
        estimatedMinutesRemaining: 7,
        createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
        acknowledged: false,
        resolved: false
    },
    {
        id: 'a2',
        bedId: 'b4',
        type: 'FLOW_ABNORMALITY',
        priority: 'FLOW ABNORMALITY',
        message: 'Possible flow abnormality - Nurse verification required',
        remainingVolumeMl: 320,
        estimatedMinutesRemaining: 300,
        createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
        acknowledged: false,
        resolved: false
    },
    {
        id: 'a3',
        bedId: 'b2',
        type: 'ATTENTION',
        priority: 'ATTENTION',
        message: 'IV approaching attention threshold',
        remainingVolumeMl: 155,
        estimatedMinutesRemaining: 26,
        createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
        acknowledged: true,
        acknowledgedBy: 'Kavya R',
        acknowledgedByNurseId: 'NURSE-001',
        acknowledgedAt: new Date(Date.now() - 12 * 60000).toISOString(),
        resolved: false
    }
];
