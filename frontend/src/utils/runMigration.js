import { migrationService } from '../services/database';

// Function to run the migration to split users into role-specific collections
export async function runUserMigration() {
  try {
    console.log('🚀 Starting user migration to role-based collections...');
    
    const result = await migrationService.migrateExistingUsers();
    
    if (result.success) {
      console.log(`✅ Migration completed successfully! Migrated ${result.migratedCount} users.`);
      return { success: true, migratedCount: result.migratedCount };
    } else {
      console.error('❌ Migration failed:', result.error);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error('❌ Migration error:', error);
    return { success: false, error: error.message };
  }
}

// Auto-run migration if called directly
if (import.meta.hot) {
  // Only run in development
  runUserMigration();
}