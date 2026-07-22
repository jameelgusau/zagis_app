import { create } from "zustand";
import { User, Department, FileRecord, Rank, DandR , PurposeType} from "@/lib/types";

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
    // caregivers: Caregiver[];
    // setCaregivers: (caregivers: Caregiver[]) => void;
    // beneficiaries: Beneficiary[];
    // setBeneficiaries: (caregivers: Beneficiary[]) => void;
    // terms: Term[];
    // setTerms: (terms: Term[]) => void;
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
    //  beneficiaries: [],
    // setBeneficiaries: (beneficiaries) => set({ beneficiaries }),
    // terms: [],
    // setTerms: (terms) => set({ terms })
}));