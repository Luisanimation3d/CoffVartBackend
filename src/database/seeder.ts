import {permissionSeeder} from "../seeders/permissions.seeder";
import {processesSeeder} from "../seeders/processes.seeder";
import {rolesSeeder} from "../seeders/roles.seeder";

export async function seeders() {
    await permissionSeeder();
    await processesSeeder();
    await rolesSeeder();
}

seeders();