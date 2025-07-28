const db = require('../db');
const fs = require('fs');
const path = require('path');

async function setupPromptsTable() {
  try {
    console.log('Setting up AI prompts table...');
    const sqlPath = path.join(__dirname, 'prompts.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    const statements = sqlContent.split(';').filter(stmt => stmt.trim());

    for (const statement of statements) {
      await db.execute(statement);
      console.log('✅ Executed:', statement.trim().slice(0, 60) + '...');
    }

    const [prompts] = await db.execute('SELECT COUNT(*) as count FROM ai_prompts');
    console.log(`📊 Total prompts: ${prompts[0].count}`);
  } catch (error) {
    console.error('❌ Setup failed:', error);
  } finally {
    process.exit(0);
  }
}

setupPromptsTable();
