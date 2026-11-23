import { create } from "zustand";
import { User, Department, FileRecord, Rank, DandR , PurposeType, Zone, Lga } from "@/lib/types";

interface DashboardState {
    users: User[]
    setUsers: (user: User[]) => void;
    records: FileRecord[];
    setRecords: (records: FileRecord[]) => void;
    departments: Department[],
    setDepartments: (departments: Department[]) => void;
    ranks: Rank[];
    setRanks: (ranks: Rank[]) => void;
    dandrs: DandR[]
    setDandRs: (dandrs: DandR[]) => void;
    purposes: PurposeType[];
    setPurposes: (purposes: PurposeType[]) => void;
    zones: Zone[];
    setZones: (zones: Zone[]) => void;
    // beneficiaries: Beneficiary[];
    // setBeneficiaries: (caregivers: Beneficiary[]) => void;
    lgas: Lga[];
    setLgas: (lgas: Lga[]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
    records: [],
    setRecords: (records) => set({ records }),
    departments: [],
    setDepartments: (departments) => set({ departments }),
    ranks: [],
    setRanks: (ranks) => set({ ranks }),
    dandrs: [],
    setDandRs: (dandrs) => set({ dandrs }),
    purposes: [],
    setPurposes: (purposes) => set({ purposes }),
    zones: [],
    setZones: (zones) => set({ zones }),
    lgas: [],
    setLgas: (lgas) => set({ lgas }),
    // setBeneficiaries: (beneficiaries) => set({ beneficiaries }),
    // terms: [],
    // setTerms: (terms) => set({ terms })
}));