import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // endpoint proxy to server A
  app.use('/firma', createProxyMiddleware({
      target: process.env.URL_SERVER_A,
      changeOrigin: true,
      pathRewrite: {
        [`^/firma`]: '',
      },
    }),
  );

  // endpoint proxy to server B
  app.use('/validar', createProxyMiddleware({
      target: process.env.URL_SERVER_B,
      changeOrigin: true,
      pathRewrite: {
        [`^/validar`]: '',
      },
    }),
  );
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
