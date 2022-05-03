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
    message: '',
    isSuccessful: false,
    roleId: '',
    name: '',
    selectedIds: []
}
