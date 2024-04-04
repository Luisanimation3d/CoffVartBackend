import {permissionSeeder} from "../seeders/permissions.seeder";
import {processesSeeder} from "../seeders/processes.seeder";
import {rolesSeeder} from "../seeders/roles.seeder";
import {userSeeder} from "../seeders/user.seeder";

export async function seeders() {
    await permissionSeeder();
    await processesSeeder();
    await rolesSeeder();
    await userSeeder();
}

seeders();