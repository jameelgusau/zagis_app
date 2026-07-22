export interface User {
  id: string;
  full_name: string;
  department_name: string;
  department_id: string;
  rank_name: string
  rank_id: string
  phone: string;
  email: string;
  image?: string;
  role: string;
  link?: string;
  isVerified?: boolean;
}

export interface PurposeType {
  purpose_name: string;
  lease_years: number;
  landuse_name: string;
  landuse_id: string;
  id: string;
}


export interface LanduseAndPurpose {
  id: string;
  landuse_name: string;
  detailedLanduses: {
    purpose_name: string;
    lease_years: number;
    landuse_id: string;
    id: string;
  }[]
}


export interface Rank {
  id: string;
  rank_name: string;
  department_name: string;
  department_id: string;

}

export interface Department {
  department_name: string
  id: string
}
export interface DandR extends Department {
  ranks: Rank[]
}

export interface FileRecord {
  id: string;
  file_id: string;
  purpose_id: string;
  landuse_id: string;
  cofo_number: string;
  title_holder_name: string;
  collected: "Yes" | "No";
  certificate_type: "Certificate" | "Letter of Grant" | "Temporary" | null
  page_number?: number | null;
  serial_number?: number | null;
  volume_number?: number | null;
  registration_date?: Date | null;
  execution_date?: Date | null;
  collection_date?: Date | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface LanduseType {
  landuse_name: string;
  id: string;
}

export interface DashStats {
  files: number;
  accounts: number;
  collected: number;
  not_collected: number;
}

export interface DashGraph {
  date: string,
  collected: string,
  not_collected: string,
  total: string,
}
