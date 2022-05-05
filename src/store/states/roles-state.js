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
      
    
   deleteRole: {
        items: []
      },

    message: '',
    isSuccessful: false,
    roleId: '',
    name: '',
    selectedIds: []
}
