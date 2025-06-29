import { Pool } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function initializeDatabase() {
  try {
    console.log('Inicializando banco de dados...');
    
    // Inserir empresa padrão
    await pool.query(`
      INSERT INTO companies (name, domain, logo, primary_color, created_at) 
      VALUES ('NXT.ai', 'dnxtai.com', NULL, '#120028', NOW())
      ON CONFLICT (domain) DO NOTHING;
    `);
    console.log('✓ Empresa NXT.ai criada');

    // Hash da senha 'senha123'
    const hashedPassword = bcrypt.hashSync('senha123', 10);
    
    // Inserir usuário administrador
    await pool.query(`
      INSERT INTO users (username, email, password, role, company_id, is_active, created_at) 
      VALUES ('admin', 'admin@dnxtai.com', $1, 'admin', 1, true, NOW())
      ON CONFLICT (email) DO NOTHING;
    `, [hashedPassword]);
    console.log('✓ Usuário admin criado');

    // Inserir leads de exemplo
    await pool.query(`
      INSERT INTO leads (email, name, phone, status, source, company_id, created_at) VALUES
      ('maria.silva@email.com', 'Maria Silva', '+55 11 99999-0001', 'novo', 'site', 1, NOW()),
      ('joao.santos@email.com', 'João Santos', '+55 21 99999-0002', 'qualificado', 'facebook', 1, NOW()),
      ('ana.costa@email.com', 'Ana Costa', '+55 31 99999-0003', 'convertido', 'google_ads', 1, NOW())
      ON CONFLICT (email) DO NOTHING;
    `);
    console.log('✓ Leads de exemplo criados');

    // Inserir campanhas de exemplo
    await pool.query(`
      INSERT INTO campaigns (name, type, status, company_id, created_at) VALUES
      ('Campanha Black Friday 2025', 'email', 'ativa', 1, NOW()),
      ('Lançamento Produto X', 'social_media', 'pausada', 1, NOW()),
      ('Retargeting Website', 'google_ads', 'ativa', 1, NOW())
      ON CONFLICT (name, company_id) DO NOTHING;
    `);
    console.log('✓ Campanhas de exemplo criadas');

    // Inserir workflows de exemplo
    await pool.query(`
      INSERT INTO workflows (name, description, is_active, company_id, created_at) VALUES
      ('Boas-vindas Novos Leads', 'Workflow automático para novos leads', true, 1, NOW()),
      ('Nutrição por Email', 'Sequência de emails educativos', true, 1, NOW()),
      ('Follow-up Vendas', 'Acompanhamento pós-proposta', false, 1, NOW())
      ON CONFLICT (name, company_id) DO NOTHING;
    `);
    console.log('✓ Workflows de exemplo criados');

    // Inserir webhooks de exemplo
    await pool.query(`
      INSERT INTO webhooks (name, url, events, is_active, company_id, created_at) VALUES
      ('Integração CRM', 'https://api.exemplo.com/webhook', 'lead.created,lead.updated', true, 1, NOW()),
      ('Notificações Slack', 'https://hooks.slack.com/services/xxx', 'campaign.completed', true, 1, NOW())
      ON CONFLICT (name, company_id) DO NOTHING;
    `);
    console.log('✓ Webhooks de exemplo criados');

    console.log('🎉 Banco de dados inicializado com sucesso!');
    console.log('📧 Login: admin@dnxtai.com');
    console.log('🔑 Senha: senha123');
    
  } catch (error) {
    console.error('❌ Erro ao inicializar banco:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Executar apenas se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase();
}

export { initializeDatabase };