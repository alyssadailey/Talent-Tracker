export interface Employee{
id: number;
first_name: string;
last_name: string;
roleId?: number;
managerId?: number;
}

export interface Manager extends Employee{
    departmentId?: number;
}