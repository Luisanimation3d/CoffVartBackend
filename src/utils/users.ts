interface Customer {
    documentType: "CC" | "CE" | "PAS";
    document: string;
    address: string;
}


export const users: {
    name:     string;
    lastname: string;
    state:    boolean;
    phone:    string;
    email:    string;
    password: string;
    roleId:   number;
    coustumer: Customer;
}[] = [
    {
        name: 'Luis',
        lastname: 'Correa',
        state: true,
        phone: '3045616983',
        email: 'luisaniamtion3d@gmail.com',
        password: 'Admin123*',
        roleId: 1,
        coustumer: {
            documentType: 'CC',
            document: '1000099926',
            address: 'Calle 96C # 80 - 15'
        }
    }
]