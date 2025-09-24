// Базові налаштування S3 сховища
export const s3Config = {
  // AWS S3
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  
  // Альтернативні S3-сумісні сервіси
  S3_ENDPOINT: process.env.S3_ENDPOINT,
  S3_FORCE_PATH_STYLE: process.env.S3_FORCE_PATH_STYLE === 'true',
  
  // Завантаження файлів
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB
  ALLOWED_FILE_TYPES: process.env.ALLOWED_FILE_TYPES 
    ? process.env.ALLOWED_FILE_TYPES.split(',')
    : [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'text/plain'
      ],
  
  // CDN
  CDN_URL: process.env.CDN_URL,
  CACHE_CONTROL: process.env.CACHE_CONTROL || 'public, max-age=31536000',
  
  // Структура папок
  UPLOADS_FOLDER: process.env.UPLOADS_FOLDER || 'uploads',
  AVATARS_FOLDER: process.env.AVATARS_FOLDER || 'avatars',
  DOCUMENTS_FOLDER: process.env.DOCUMENTS_FOLDER || 'documents',
  TEMP_FOLDER: process.env.TEMP_FOLDER || 'temp',
  
  // Безпека
  PRESIGNED_URL_EXPIRES_IN: parseInt(process.env.PRESIGNED_URL_EXPIRES_IN || '3600'),
  ALLOW_PUBLIC_ACCESS: process.env.ALLOW_PUBLIC_ACCESS === 'true',
  
  // Обробка зображень
  ENABLE_IMAGE_RESIZE: process.env.ENABLE_IMAGE_RESIZE !== 'false',
  IMAGE_QUALITY: parseInt(process.env.IMAGE_QUALITY || '85'),
  THUMBNAIL_SIZES: process.env.THUMBNAIL_SIZES 
    ? process.env.THUMBNAIL_SIZES.split(',').map(Number)
    : [150, 300, 600],
};

export type S3Config = typeof s3Config;
