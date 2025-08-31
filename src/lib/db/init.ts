import { pool } from './index'
import { readFileSync } from 'fs'
import { join } from 'path'

async function initDatabase() {
  try {
    console.log('Initializing database...')
    
    // Read the schema SQL file
    const schemaPath = join(process.cwd(), 'src', 'lib', 'db', 'schema.sql')
    const schema = readFileSync(schemaPath, 'utf-8')
    
    // Execute the schema
    const client = await pool.connect()
    await client.query(schema)
    client.release()
    
    console.log('Database initialized successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Failed to initialize database:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  initDatabase()
}