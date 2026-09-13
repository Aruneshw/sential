import React, { createContext, useContext, useState, useEffect } from 'react';
import { Bed, Alert, Nurse } from '../types';
import { MOCK_BEDS, MOCK_ALERTS, MOCK_NURSES } from '../data/mockData';
import { getBeds } from '../services/api';

interface Toast {
    id: string;
    message: string;
    details?: string;
}

interface DataContextType {
    beds: Bed[];
    alerts: Alert[];
    nurses: Nurse[];
    toasts: Toast[];
    addPatient: (bed: Omit<Bed, 'id'>) => { success: boolean; error?: string };
    acknowledgeAlert: (alertId: string, nurseId: string) => void;
    removeToast: (id: string) => void;
    showToast: (message: string, details?: string) => void;
    isBackendOnline: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [beds, setBeds] = useState<Bed[]>(() => {
        const saved = localStorage.getItem('iv_beds');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return MOCK_BEDS;
            }
        }
        return MOCK_BEDS;
    });

    const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);

    const [toasts, setToasts] = useState<Toast[]>([]);
    const [isBackendOnline, setIsBackendOnline] = useState(false);

    useEffect(() => {
        const fetchLiveData = async () => {
            try {
                const liveBedsData = await getBeds();
                setIsBackendOnline(true);

                setBeds(prevBeds => {
                    return prevBeds.map(bed => {
                        const cleanBedNumber = bed.bedNumber.replace(/[-\s]/g, '').toUpperCase();
                        const liveMatched = liveBedsData.find((lb: any) => {
                            if (!lb.bedId) return false;
                            const cleanLiveBedId = lb.bedId.replace(/[-\s]/g, '').toUpperCase();
                            return cleanLiveBedId === cleanBedNumber || lb.bedId === bed.id;
                        });

                        if (liveMatched) {
                            let derivedOverall: Bed['overallStatus'] = 'NORMAL';
                            let derivedFlow = liveMatched.flowStatus;

                            if (derivedFlow === 'abnormal') {
                                derivedOverall = 'ACTION REQUIRED';
                            } else if (liveMatched.remainingPercentage <= 15) {
                                derivedOverall = 'CRITICAL';
                                if (derivedFlow === 'normal') derivedFlow = 'critical';
                            } else if (liveMatched.remainingPercentage <= 35) {
                                derivedOverall = 'ATTENTION';
                                if (derivedFlow === 'normal') derivedFlow = 'attention';
                            }

                            return {
                                ...bed,
                                remainingVolumeMl: liveMatched.remainingVolumeMl,
                                remainingPercentage: liveMatched.remainingPercentage,
                                dropRatePerMinute: liveMatched.dropRatePerMinute,
                                flowStatus: derivedFlow,
                                overallStatus: derivedOverall,
                                deviceOnline: liveMatched.deviceOnline !== undefined ? liveMatched.deviceOnline : true,
                                lastUpdated: liveMatched.timestamp || new Date().toISOString()
                            };
                        }
                        return bed;
                    });
                });
            } catch (error) {
                setIsBackendOnline(false);
            }
        };

        const interval = setInterval(fetchLiveData, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        localStorage.setItem('iv_beds', JSON.stringify(beds));
    }, [beds]);

    const showToast = (message: string, details?: string) => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, message, details }]);
        setTimeout(() => removeToast(id), 5000);
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const addPatient = (newBedData: Omit<Bed, 'id'>) => {
        const isDuplicateBed = beds.some(b => b.bedNumber.trim().toLowerCase() === newBedData.bedNumber.trim().toLowerCase());
        const isDuplicateDevice = beds.some(b => b.deviceId.trim().toLowerCase() === newBedData.deviceId.trim().toLowerCase());

        if (isDuplicateBed) {
            return { success: false, error: `Bed ${newBedData.bedNumber} is already assigned.` };
        }
        if (isDuplicateDevice) {
            return { success: false, error: 'This device is already assigned to another bed.' };
        }

        const newBed: Bed = {
            ...newBedData,
            id: `b${Date.now()}`
        };

        setBeds(prev => [...prev, newBed]);
        showToast('✓ Patient added successfully', `${newBed.bedNumber} is now being monitored in demo mode.`);
        return { success: true };
    };

    const acknowledgeAlert = (alertId: string, nurseId: string) => {
        const nurse = MOCK_NURSES.find(n => n.id === nurseId);
        if (!nurse) return;

        setAlerts(prev => prev.map(a =>
            a.id === alertId ? {
                ...a,
                acknowledged: true,
                acknowledgedBy: nurse.name,
                acknowledgedByNurseId: nurse.id,
                acknowledgedAt: new Date().toISOString()
            } : a
        ));

        const bedId = alerts.find(a => a.id === alertId)?.bedId;
        const bedName = beds.find(b => b.id === bedId)?.bedNumber || 'Unknown Bed';

        showToast('✓ Alert acknowledged', `${bedName} — acknowledged by ${nurse.name}.`);
    };

    return (
        <DataContext.Provider value={{ beds, alerts, nurses: MOCK_NURSES, addPatient, acknowledgeAlert, toasts, removeToast, showToast, isBackendOnline }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
