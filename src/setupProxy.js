import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  app.use(
    '/eventcollector',
    createProxyMiddleware({
      target: 'http://localhost:8181',
      changeOrigin: true,
      pathRewrite: {'^/eventcollector': '/eventcollector'}, // En este caso, simplemente mantendremos la ruta igual.
    })
  );
  // Si tienes otros endpoints específicos, puedes configurarlos de manera similar aquí.
}
