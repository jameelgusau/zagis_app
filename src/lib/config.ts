
export const APIS = {
    // baseURL: "http://localhost:7070",
    baseURL: "http://192.168.1.47:7070",
    verifytoken: {
        method: "POST",
        path: "/api/verify-email",
    },
    refreshtoken: {
        method: "POST",
        path: "/api/refresh-token",
    },
    login: {
        method: "POST",
        path: "/api/authenticate",
    },
    initreset: {
        method: "POST",
        path: "/api/forgot-password",
    },
    passwordReset: {
        method: "POST",
        path: "/api/reset-password",
    },
    verifyEmail: {
        method: "POST",
        path: "/api/verify-email",
    },
    createUser: {
        method: "POST",
        path: "/api/account"
    },
    changePassword: {
        method: "PUT",
        path: "/api/change-password"
    },
    getUsers: {
        method: "GET",
        path: "/api/users"
    },
    getUser: {
        method: "GET",
        path: ({ id }: { id: string }) => `/api/user/${id}`,
    },
    deleteUser: {
        method: "DELETE",
        path: ({ id }: { id: string }) => `/api/account/${id}`,
    },
    updateUser: {
        method: "PUT",
        path: "/api/user"
    },
    updateAccount: {
        method: "PUT",
        path: "/api/account"
    },
    getFiles: {
        method: "GET",
        path: "/api/files"
    },
    addFile: {
        method: "POST",
        path: "/api/file"
    },
    deleteFile: {
        method: "DELETE",
        path: ({ id }: { id: string }) => `/api/file/${id}`,
    },
    updateFile: {
        method: "PUT",
        path: "/api/file"
    },
    addDepartment: {
        method: "POST",
        path: "/api/department"
    },
    getDepartment: {
        method: "GET",
        path: ({ id }: { id: string }) => `/api/department/${id}`
    },
    getDepartments: {
        method: "GET",
        path: "/api/departments"
    },
    updateDepartment: {
        method: "PUT",
        path: "/api/department"
    },
    deleteDepartment: {
        method: "DELETE",
        path: ({ id }: { id: string }) => `/api/department/${id}`
    },
    getRanks: {
        method: "GET",
        path: "/api/ranks"
    },
    addRank: {
        method: "POST",
        path: "/api/rank"
    },
    deleteRank: {
        method: "DELETE",
        path: ({ id }: { id: string }) => `/api/rank/${id}`,
    },
    updateRank: {
        method: "PUT",
        path: "/api/rank"
    },
    getDepartmentsAndRanks: {
        method: "GET",
        path: "/api/departments_ranks"
    },
    addLanduse: {
        method: "POST",
        path: "/api/landuse"
    },
    getLanduse: {
        method: "GET",
        path: "/api/landuse"
    },
    addPurpose: {
        method: "POST",
        path: "/api/purpose"
    },
    updatePurpose: {
        method: "PUT",
        path: "/api/purpose"
    },
    getPurpose: {
        method: "GET",
        path: "/api/purpose"
    },
    deletePurpose: {
        method: "DELETE",
        path: ({ id }: { id: string }) => `/api/purpose/${id}`,
    },
    getLanduseAndPurpose: {
        method: "GET",
        path: "/api/landuses_purposes"
    },
    updateCaregiver: {
        method: "PUT",
        path: "/api/caregiver"
    },
    getCaregiver: {
        method: "GET",
        path: ({ id }: { id: string }) => `/api/caregiver/${id}`,
    },
    addbeneficiary: {
        method: "POST",
        path: "/api/beneficiary"
    },
    updatebeneficiary: {
        method: "PUT",
        path: "/api/beneficiary"
    },
    getBeneficiaries: {
        method: "GET",
        path: "/api/beneficiaries"
    },
    getBenes: {
        method: "GET",
        path: "/api/benes"
    },
    deleteBeneficiary: {
        method: "DELETE",
        path: ({ id }: { id: string }) => `/api/beneficiary/${id}`,
    },
    getBeneficiary: {
        method: "GET",
        path: ({ id }: { id: string }) => `/api/beneficiary/${id}`,
    },
    getDashStats: {
        method: "GET",
        path: "/api/dashboard/stats"
    },
    getDashGraph: {
        method: "GET",
        path: "/api/dashboard/graph"
    },
    uploadSchools: {
        method: "POST",
        path: "/api/schools/upload-csv"
    },
    addTerm: {
        method: "POST",
        path: "/api/term"
    },
    updateTerm: {
        method: "POST",
        path: "/api/term"
    },
    getTerms: {
        method: "GET",
        path: "/api/terms"
    },
    // getAttendace: {
    //     method: "GET",
    //     path: "/api/attendance"
    // },
    getAttendace: {
        method: "GET",
        path: ({ from, to }: { from: string, to: string }) => {
            return `/api/attendance?from=${from}&to=${to}`
        }
    },
    getCurrentTerm: {
        method: "GET",
        path: "/api/current-term"
    },
    deleteTerm: {
        method: "DELETE",
        path: ({ id }: { id: string }) => `/api/term/${id}`,
    },
    getTerm: {
        method: "GET",
        path: ({ id }: { id: string }) => `/api/term/${id}`,
    },
    addBreak: {
        method: "POST",
        path: "/api/break"
    },
    updateBreak: {
        method: "PUT",
        path: "/api/break"
    },
    deleteBreak: {
        method: "DELETE",
        path: ({ id }: { id: string }) => `/api/break/${id}`,
    },
    addAttendace: {
        method: "POST",
        path: "/api/attendance"
    }
}
