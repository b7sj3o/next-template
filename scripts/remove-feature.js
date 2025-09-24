#!/usr/bin/env node

/**
 * Скрипт для видалення невикористаних функцій з шаблону
 * Використання: node scripts/remove-feature.js <feature-name>
 * 
 * Доступні функції: auth, i18n, payments, storage, analytics
 */

const fs = require('fs');
const path = require('path');

const FEATURES = {
  auth: {
    files: [
      'lib/auth.ts',
      'middlewares/withAuth.ts',
      'modules/auth/',
      'app/api/v1/auth/',
      'schemas/auth.ts',
    ],
    dependencies: ['jose', 'bcrypt'],
    config: ['auth.config.ts']
  },
  i18n: {
    files: [
      'middlewares/withLocale.ts',
      'modules/i18n/',
      'languages/',
    ],
    dependencies: ['next-intl'],
    config: ['i18n.config.ts']
  },
  payments: {
    files: [
      'lib/payments.ts',
      'modules/payments/',
      'app/api/v1/payments/',
      'schemas/payment.ts',
    ],
    dependencies: ['stripe'],
    config: ['payments.config.ts']
  },
  storage: {
    files: [
      'lib/storage.ts',
      'modules/storage/',
      'app/api/v1/uploads/',
    ],
    dependencies: ['aws-sdk'],
    config: ['s3.config.ts']
  },
  analytics: {
    files: [
      'modules/analytics/',
    ],
    dependencies: [],
    config: []
  }
};

function removeFeature(featureName) {
  if (!FEATURES[featureName]) {
    console.error(`❌ Невідома функція: ${featureName}`);
    console.log(`Доступні функції: ${Object.keys(FEATURES).join(', ')}`);
    process.exit(1);
  }

  const feature = FEATURES[featureName];
  console.log(`🗑️  Видаляємо функцію: ${featureName}`);

  // Видаляємо файли
  feature.files.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      if (fs.statSync(filePath).isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
        console.log(`📁 Видалено папку: ${file}`);
      } else {
        fs.unlinkSync(filePath);
        console.log(`📄 Видалено файл: ${file}`);
      }
    }
  });

  // Видаляємо конфігураційні файли
  feature.config.forEach(configFile => {
    const configPath = path.join(process.cwd(), 'config', configFile);
    if (fs.existsSync(configPath)) {
      fs.unlinkSync(configPath);
      console.log(`⚙️  Видалено конфіг: config/${configFile}`);
    }
  });

  console.log(`✅ Функція ${featureName} успішно видалена!`);
  console.log(`💡 Не забудьте видалити залежності: ${feature.dependencies.join(', ')}`);
}

// Отримуємо аргумент командного рядка
const featureName = process.argv[2];

if (!featureName) {
  console.error('❌ Вкажіть назву функції для видалення');
  console.log('Використання: node scripts/remove-feature.js <feature-name>');
  console.log(`Доступні функції: ${Object.keys(FEATURES).join(', ')}`);
  process.exit(1);
}

removeFeature(featureName);
