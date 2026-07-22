import { AxiosInstance } from "axios";
import { APIS } from "@/lib/config"
import { DandR, Department, FileRecord, Rank, User, DashStats, DashGraph, LanduseType, PurposeType, LanduseAndPurpose } from "@/lib/types"


export async function getDepartmentsRequest(axiosPrivate: AxiosInstance): Promise<Department[]> {
  const { getDepartments: { path } } = APIS;

  const response = await axiosPrivate.get(path);

  if (response.data.meta.status !== 200)
    return [];

  return response.data.data;
}


export async function getFilesRequest(axiosPrivate: AxiosInstance): Promise<FileRecord[]> {
  const { getFiles: { path } } = APIS;

  const response = await axiosPrivate.get(path);

  if (response.data.meta.status !== 200)
    return [];

  return response.data.data;
}

export async function getRanksRequest(axiosPrivate: AxiosInstance): Promise<Rank[]> {
  const { getRanks: { path } } = APIS;

  const response = await axiosPrivate.get(path);

  if (response.data.meta.status !== 200)
    return [];

  return response.data.data;
}

export async function getDepartmentsAndRanksRequest(axiosPrivate: AxiosInstance): Promise<DandR[]> {
  const { getDepartmentsAndRanks: { path } } = APIS;

  const response = await axiosPrivate.get(path);

  if (response.data.meta.status !== 200)
    return [];

  return response.data.data;
}


export async function getUsersRequest(axiosPrivate: AxiosInstance): Promise<User[]> {
  const { getUsers: { path } } = APIS;

  const response = await axiosPrivate.get(path);

  if (response.data.meta.status !== 200)
    throw new Error("Failed to fetch users");

  return response.data.data;
}

export async function getDashStatsRequest(axiosPrivate: AxiosInstance): Promise<DashStats> {

  const { getDashStats: { path } } = APIS;
  const response = await axiosPrivate.get(path);

  if (response.data.meta.status !== 200)
    throw new Error("Failed to fetch");

  return response.data.data;
} 

export async function getDashGraphRequest(axiosPrivate: AxiosInstance): Promise<DashGraph[]> {

  const { getDashGraph: { path } } = APIS;
  const response = await axiosPrivate.get(path);

  if (response.data.meta.status !== 200)
    throw "Failed to fetch";

  return response.data.data;
} 

export async function getLandusesRequest(axiosPrivate: AxiosInstance): Promise<LanduseType[]> {

  const { getLanduse: { path } } = APIS;
  const response = await axiosPrivate.get(path);

  if (response.data.meta.status !== 200)
    throw "Failed to fetch";

  return response.data.data;
} 

export async function getPurposesRequest(axiosPrivate: AxiosInstance): Promise<PurposeType[]> {

  const { getPurpose: { path } } = APIS;
  const response = await axiosPrivate.get(path);

  if (response.data.meta.status !== 200)
    return []

  return response.data.data;
}

export async function getLanduseAndPurposeRequest(axiosPrivate: AxiosInstance): Promise<LanduseAndPurpose[]> {
  const { getLanduseAndPurpose: { path } } = APIS;

  const response = await axiosPrivate.get(path);

  if (response.data.meta.status !== 200)
    return [];

  return response.data.data;
}

