'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Users,
  AlertTriangle,
  Activity,
  Phone,
  Video,
  FileText,
  Pill,
  Heart,
  Settings,
  Bell,
  Plus,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: 'waiting' | 'in-room' | 'completed' | 'urgent';
  appointmentTime: string;
  roomNumber?: string;
  vitals?: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenSat: number;
  };
  lastUpdated: Date;
}

interface VitalAlert {
  patientId: string;
  patientName: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
}

interface Prescription {
  id: string;
  patientName: string;
  medication: string;
  dosage: string;
  status: 'pending' | 'approved' | 'dispensed';
  prescribedBy: string;
  timestamp: Date;
}

export default function MedPracticeDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [patients, setPatients] = useState<Patient[]>([]);
  const [vitalAlerts, setVitalAlerts] = useState<VitalAlert[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [activeTab, setActiveTab] = useState<'queue' | 'vitals' | 'prescriptions' | 'telehealth'>('queue');

  // Initialize sample data
  useEffect(() => {
    const samplePatients: Patient[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        age: 34,
        condition: 'Annual Checkup',
        status: 'waiting',
        appointmentTime: '09:00 AM',
        vitals: { heartRate: 72, bloodPressure: '120/80', temperature: 98.6, oxygenSat: 98 },
        lastUpdated: new Date()
      },
      {
        id: '2',
        name: 'Michael Chen',
        age: 45,
        condition: 'Chest Pain',
        status: 'urgent',
        appointmentTime: '09:15 AM',
        roomNumber: 'Room 3',
        vitals: { heartRate: 95, bloodPressure: '140/90', temperature: 99.2, oxygenSat: 95 },
        lastUpdated: new Date()
      },
      {
        id: '3',
        name: 'Emma Wilson',
        age: 28,
        condition: 'Follow-up Visit',
        status: 'in-room',
        appointmentTime: '09:30 AM',
        roomNumber: 'Room 1',
        vitals: { heartRate: 68, bloodPressure: '118/75', temperature: 98.4, oxygenSat: 99 },
        lastUpdated: new Date()
      },
      {
        id: '4',
        name: 'Robert Martinez',
        age: 52,
        condition: 'Diabetes Management',
        status: 'completed',
        appointmentTime: '08:45 AM',
        vitals: { heartRate: 78, bloodPressure: '130/85', temperature: 98.8, oxygenSat: 97 },
        lastUpdated: new Date()
      },
      {
        id: '5',
        name: 'Lisa Anderson',
        age: 39,
        condition: 'Telemedicine Consultation',
        status: 'waiting',
        appointmentTime: '09:45 AM',
        vitals: { heartRate: 74, bloodPressure: '125/82', temperature: 98.5, oxygenSat: 98 },
        lastUpdated: new Date()
      }
    ];

    const sampleAlerts: VitalAlert[] = [
      {
        patientId: '2',
        patientName: 'Michael Chen',
        type: 'critical',
        message: 'Elevated blood pressure detected - 140/90',
        timestamp: new Date(Date.now() - 5 * 60000)
      },
      {
        patientId: '2',
        patientName: 'Michael Chen',
        type: 'warning',
        message: 'Heart rate above normal range - 95 BPM',
        timestamp: new Date(Date.now() - 8 * 60000)
      },
      {
        patientId: '4',
        patientName: 'Robert Martinez',
        type: 'info',
        message: 'Blood glucose level recorded - 145 mg/dL',
        timestamp: new Date(Date.now() - 15 * 60000)
      }
    ];

    const samplePrescriptions: Prescription[] = [
      {
        id: 'rx1',
        patientName: 'Michael Chen',
        medication: 'Lisinopril 10mg',
        dosage: 'Once daily',
        status: 'pending',
        prescribedBy: 'Dr. Smith',
        timestamp: new Date()
      },
      {
        id: 'rx2',
        patientName: 'Robert Martinez',
        medication: 'Metformin 500mg',
        dosage: 'Twice daily with meals',
        status: 'approved',
        prescribedBy: 'Dr. Johnson',
        timestamp: new Date(Date.now() - 30 * 60000)
      },
      {
        id: 'rx3',
        patientName: 'Sarah Johnson',
        medication: 'Vitamin D3 2000 IU',
        dosage: 'Once daily',
        status: 'dispensed',
        prescribedBy: 'Dr. Smith',
        timestamp: new Date(Date.now() - 60 * 60000)
      }
    ];

    setPatients(samplePatients);
    setVitalAlerts(sampleAlerts);
    setPrescriptions(samplePrescriptions);
  }, []);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prev => prev.map(patient => {
        if (Math.random() < 0.3) {
          const vitals = patient.vitals;
          if (vitals) {
            return {
              ...patient,
              vitals: {
                ...vitals,
                heartRate: vitals.heartRate + (Math.random() - 0.5) * 4,
                oxygenSat: Math.max(94, Math.min(100, vitals.oxygenSat + (Math.random() - 0.5) * 2))
              },
              lastUpdated: new Date()
            };
          }
        }
        return patient;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'in-room': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'waiting': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const updatePatientStatus = (patientId: string, newStatus: Patient['status'], roomNumber?: string) => {
    setPatients(prev => prev.map(patient => 
      patient.id === patientId 
        ? { ...patient, status: newStatus, roomNumber, lastUpdated: new Date() }
        : patient
    ));
  };

  const approvePrescription = (prescriptionId: string) => {
    setPrescriptions(prev => prev.map(rx => 
      rx.id === prescriptionId 
        ? { ...rx, status: 'approved', timestamp: new Date() }
        : rx
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link href="/healthcare" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Healthcare
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MedPractice Live Dashboard</h1>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span>LIVE MEDICAL PRACTICE</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {currentTime.toLocaleTimeString()} | {currentTime.toLocaleDateString()}
            </div>
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              {vitalAlerts.length > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              )}
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Patients Today</p>
                <p className="text-3xl font-bold text-gray-900">{patients.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">+2 from yesterday</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Urgent Cases</p>
                <p className="text-3xl font-bold text-red-600">{patients.filter(p => p.status === 'urgent').length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">Requires immediate attention</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-blue-600">{patients.filter(p => p.status === 'in-room').length}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">Currently being seen</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600">{patients.filter(p => p.status === 'completed').length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">Today&apos;s completed visits</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'queue', label: 'Patient Queue', icon: Users },
                { key: 'vitals', label: 'Vital Alerts', icon: Activity },
                { key: 'prescriptions', label: 'Prescriptions', icon: Pill },
                { key: 'telehealth', label: 'Telehealth', icon: Video }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as 'queue' | 'vitals' | 'prescriptions' | 'telehealth')}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.key
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-2" />
                    {tab.label}
                    {tab.key === 'vitals' && vitalAlerts.length > 0 && (
                      <span className="ml-2 bg-red-100 text-red-600 py-1 px-2 rounded-full text-xs">
                        {vitalAlerts.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Patient Queue Tab */}
            {activeTab === 'queue' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Patient Queue</h2>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Patient
                  </button>
                </div>

                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div
                      key={patient.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-blue-600">{patient.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                            <p className="text-sm text-gray-600">{patient.condition} • Age {patient.age}</p>
                            <p className="text-xs text-gray-500">Appointment: {patient.appointmentTime}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          {patient.vitals && (
                            <div className="text-sm text-gray-600">
                              <div>HR: {Math.round(patient.vitals.heartRate)} BPM</div>
                              <div>BP: {patient.vitals.bloodPressure}</div>
                            </div>
                          )}
                          
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                          </span>

                          {patient.roomNumber && (
                            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              {patient.roomNumber}
                            </span>
                          )}

                          <div className="flex space-x-2">
                            {patient.status === 'waiting' && (
                              <button 
                                onClick={() => updatePatientStatus(patient.id, 'in-room', `Room ${Math.floor(Math.random() * 5) + 1}`)}
                                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                              >
                                Check In
                              </button>
                            )}
                            {patient.status === 'in-room' && (
                              <button 
                                onClick={() => updatePatientStatus(patient.id, 'completed')}
                                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                              >
                                Complete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vital Alerts Tab */}
            {activeTab === 'vitals' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Vital Sign Alerts</h2>
                  <div className="text-sm text-gray-600">Real-time monitoring active</div>
                </div>

                <div className="space-y-4">
                  {vitalAlerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`border-l-4 p-4 rounded-lg ${
                        alert.type === 'critical' ? 'border-red-500 bg-red-50' :
                        alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                        'border-blue-500 bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{alert.patientName}</h3>
                          <p className="text-sm text-gray-700">{alert.message}</p>
                          <p className="text-xs text-gray-500">{alert.timestamp.toLocaleTimeString()}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                            View Patient
                          </button>
                          <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors">
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prescriptions Tab */}
            {activeTab === 'prescriptions' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Prescription Management</h2>
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    New Prescription
                  </button>
                </div>

                <div className="space-y-4">
                  {prescriptions.map((rx) => (
                    <div key={rx.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{rx.patientName}</h3>
                          <p className="text-sm text-gray-700">{rx.medication} - {rx.dosage}</p>
                          <p className="text-xs text-gray-500">Prescribed by {rx.prescribedBy} • {rx.timestamp.toLocaleTimeString()}</p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            rx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            rx.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {rx.status.charAt(0).toUpperCase() + rx.status.slice(1)}
                          </span>
                          
                          {rx.status === 'pending' && (
                            <button 
                              onClick={() => approvePrescription(rx.id)}
                              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                            >
                              Approve
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Telehealth Tab */}
            {activeTab === 'telehealth' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Telehealth Console</h2>
                  <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Video className="w-4 h-4 mr-2" />
                    Start Video Call
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Active Call: Lisa Anderson</h3>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-green-600 rounded-full">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-blue-600 rounded-full">
                          <Video className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-red-600 rounded-full">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                      <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-gray-400">Video call in progress...</p>
                      <p className="text-sm text-gray-500">Duration: 12:34</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Patient Notes</h4>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        rows={4}
                        placeholder="Enter consultation notes..."
                      />
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Quick Actions</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="flex items-center justify-center p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                          <FileText className="w-4 h-4 mr-2" />
                          View Records
                        </button>
                        <button className="flex items-center justify-center p-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
                          <Pill className="w-4 h-4 mr-2" />
                          Prescribe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">MedPractice Live Dashboard</h4>
                <p className="text-sm text-gray-600">Real-time medical practice management platform - HIPAA compliant & secure</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Built for Healthcare Providers</p>
              <p className="text-sm text-gray-500">By HandyLabs Technology Studio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 