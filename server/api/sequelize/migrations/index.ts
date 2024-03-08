import { exec } from 'child_process';
import path from 'path';

// Mock function to retrieve tenant databases. Replace this with your actual method.
async function getTenantDatabases() {
    // Example: return ['tenant1_db', 'tenant2_db'];
    return []; // Replace with actual fetch logic
}

// Function to apply migrations to a specific database
function migrateDatabase(tenantDbName) {
    return new Promise((resolve, reject) => {
        const migrationCommand = `sequelize db:migrate --url "yourDatabaseConnectionString/${tenantDbName}"`;
        
        exec(migrationCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Migration error for ${tenantDbName}:`, error);
                return reject(error);
            }
            console.log(`Migration output for ${tenantDbName}:`, stdout);
            resolve(stdout);
        });
    });
}

// Main function to iterate over tenants and migrate
async function migrateTenants() {
    const tenantDbs = await getTenantDatabases();

    for (const tenantDbName of tenantDbs) {
        try {
            await migrateDatabase(tenantDbName);
            console.log(`Successfully migrated ${tenantDbName}`);
        } catch (error) {
            console.error(`Failed to migrate ${tenantDbName}:`, error);
        }
    }
}

// Run migration
migrateTenants().then(() => console.log('Migration completed for all tenants.'));
