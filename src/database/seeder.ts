import {permissionSeeder} from "../seeders/permissions.seeder";
import {processesSeeder} from "../seeders/processes.seeder";

export async function seeders() {
    await permissionSeeder();
    await processesSeeder();
}

seeders();