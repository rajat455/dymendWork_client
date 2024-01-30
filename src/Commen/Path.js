const Path = {
    user: "/user",
    kapan: "/kapan",
    lot: "/lot",
    work: '/work',
    login:"/login",
    dashBoard:"/"
}


const Role = {
    admin: {
        ...Path
    },
    manager: {
        ...Path,
    },
    employee: {
        work: Path.work
    }
}

delete Role.manager.kapan

export const PermissionRole  = Role
export default Path