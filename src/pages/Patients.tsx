import React, { useState } from 'react';
import { Plus, X, Box, Wifi } from 'lucide-react';
import { useData } from '../context/DataContext';

const Patients: React.FC = () => {
    const { beds, addPatient } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        patientName: '',
        patientAge: '',
        patientGender: '',
        bedNumber: '',
        fluidType: '',
        bottleCapacityMl: 500,
        deviceId: ''
    });
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    };
    const isFormValid = formData.patientName.trim() && formData.bedNumber.trim() && formData.fluidType.trim() && formData.deviceId.trim();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.patientName.trim()) { setError('Patient name is required.'); return; }
        if (!formData.bedNumber.trim()) { setError('Bed number is required.'); return; }
        if (!formData.fluidType.trim()) { setError('IV Fluid Type is required.'); return; }
        if (!formData.deviceId.trim()) { setError('Device ID is required.'); return; }

        const result = addPatient({
            bedNumber: formData.bedNumber.trim().toUpperCase(),
            patientName: formData.patientName.trim(),
            patientAge: formData.patientAge ? parseInt(formData.patientAge) : '',
            patientGender: formData.patientGender || 'Unspecified',
            fluidType: formData.fluidType.trim(),
            bottleCapacityMl: Number(formData.bottleCapacityMl),
            remainingVolumeMl: Number(formData.bottleCapacityMl),
            remainingPercentage: 100,
            dropRatePerMinute: 0,
            flowStatus: 'Waiting for data',
            overallStatus: 'NORMAL',
            estimatedMinutesRemaining: null,
            deviceId: formData.deviceId.trim().toUpperCase(),
            deviceOnline: true,
            lastUpdated: new Date().toISOString()
        });

        if (!result.success) {
            setError(result.error || 'Failed to add patient.');
            return;
        }

        setIsModalOpen(false);
        setFormData({ patientName: '', patientAge: '', patientGender: '', bedNumber: '', fluidType: '', bottleCapacityMl: 500, deviceId: '' });
    };

    return (
        <div className="space-y-6 pb-12 relative">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-primary-900 tracking-tight">Patients / Beds</h1>
                    <p className="text-sm text-textMuted mt-1">Manage assigned patients and bed monitoring devices.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 shadow-sm transition-colors text-sm"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    ADD PATIENT
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {beds.map(bed => (
                    <div key={bed.id} className="bg-surface rounded-xl p-5 shadow-card border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-textMain">{bed.bedNumber}</h3>
                                <p className="text-sm text-textMuted font-medium">{bed.patientName}</p>
                            </div>
                            <div className="px-2.5 py-1 bg-success text-white rounded-md text-[10px] sm:text-xs font-bold tracking-wide uppercase">
                                {bed.overallStatus}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm mt-2 mb-4">
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 font-medium">IV Fluid</span>
                                <span className="font-semibold text-slate-800">{bed.fluidType}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 font-medium">Capacity</span>
                                <span className="font-semibold text-slate-800">{bed.bottleCapacityMl} mL</span>
                            </div>
                        </div>

                        <div className="mt-auto flex justify-between items-center pt-3 border-t border-slate-100">
                            <div className="flex items-center text-xs font-medium text-slate-600">
                                <Box className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                                {bed.deviceId}
                            </div>
                            <div className="flex items-center text-xs font-medium text-success">
                                <Wifi className="h-3.5 w-3.5 mr-1.5" />
                                Connected
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h2 className="text-lg font-bold text-slate-800">ADD NEW PATIENT</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-sm">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-100 text-danger text-sm rounded-lg font-medium">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Patient Name *</label>
                                <input type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="e.g. Raj Kumar" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Age</label>
                                    <input type="number" name="patientAge" value={formData.patientAge} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="e.g. 45" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Gender</label>
                                    <select name="patientGender" value={formData.patientGender} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white">
                                        <option value="">Select Gender ▼</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Bed Number *</label>
                                    <input type="text" name="bedNumber" value={formData.bedNumber} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 uppercase" placeholder="e.g. BED-106" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Device ID *</label>
                                    <input type="text" name="deviceId" value={formData.deviceId} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 uppercase" placeholder="e.g. IVS-006" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">IV Fluid Type *</label>
                                    <select name="fluidType" value={formData.fluidType} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white">
                                        <option value="">Select Fluid Type ▼</option>
                                        <option value="NS 0.9%">NS 0.9%</option>
                                        <option value="Ringer's Lactate (RL)">Ringer's Lactate (RL)</option>
                                        <option value="Dextrose 5% in Water (D5W)">Dextrose 5% in Water (D5W)</option>
                                        <option value="Dextrose Normal Saline (DNS)">Dextrose Normal Saline (DNS)</option>
                                        <option value="Dextrose 5% Normal Saline (D5NS)">Dextrose 5% Normal Saline (D5NS)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Bottle Capacity *</label>
                                    <select name="bottleCapacityMl" value={formData.bottleCapacityMl} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white">
                                        <option value={100}>100 mL</option>
                                        <option value={200}>200 mL</option>
                                        <option value={250}>250 mL</option>
                                        <option value={500}>500 mL</option>
                                        <option value={1000}>1000 mL</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-slate-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 rounded-lg text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                                    CANCEL
                                </button>
                                <button type="submit" disabled={!isFormValid} className="flex-1 py-2 rounded-lg text-sm font-bold bg-primary-600 text-white hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                    ADD PATIENT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Patients;
