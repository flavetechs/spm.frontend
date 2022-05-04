export const _state = {
    loading: false,
    roles: [],
    selectedRole: {
        name: '', roleId: '', activities: [
            {
                activityId: "",
                canCreate: true,
                canUpdate: true,
                canDelete: true,
                canImport: true,
                canExport: true
            }
        ]
    },
<<<<<<< HEAD
=======
    newRole: {
        name: '', roleId: '', activities: [
            {
                activityId: "",
                canCreate: false,
                canUpdate: false,
                canDelete: false,
                canImport: false,
                canExport: false
            }
        ]
    },
>>>>>>> 2908d646c067a96a3454e2bd391dc0ba485029ec
    message: '',
    isSuccessful: false,
    roleId: '',
    name: '',
    selectedIds: []
}
