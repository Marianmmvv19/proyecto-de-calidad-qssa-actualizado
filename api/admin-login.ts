import type { IncomingMessage, ServerResponse } from 'node:http';
import { isAdminPasswordConfigured, verifyAdminCredentials } from '../server/adminAuth.js';

type LoginRequest = IncomingMessage & { body?: unknown };
type LoginResponse = ServerResponse & {
  status: (code: number) => LoginResponse;
  json: (body: Record<string, boolean | string>) => void;
};

const sendJson = (res: LoginResponse, status: number, body: Record<string, boolean | string>) => {
  res.status(status).json(body);
};

export default async function handler(req: LoginRequest, res: LoginResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Método no permitido.' });
  }

  if (!isAdminPasswordConfigured()) {
    return sendJson(res, 503, { error: 'El acceso de administrador no está configurado en el servidor.' });
  }

  let body = req.body;
  if (body === undefined) {
    let rawBody = '';
    for await (const chunk of req) {
      rawBody += chunk.toString();
      if (rawBody.length > 8_192) {
        return sendJson(res, 413, { error: 'La solicitud es demasiado grande.' });
      }
    }

    try {
      body = JSON.parse(rawBody);
    } catch {
      return sendJson(res, 400, { error: 'La solicitud no tiene un formato válido.' });
    }
  }

  if (!body || typeof body !== 'object') {
    return sendJson(res, 400, { error: 'La solicitud no tiene un formato válido.' });
  }

  const credentials = body as { username?: unknown; password?: unknown };
  if (verifyAdminCredentials(credentials.username, credentials.password)) {
    return sendJson(res, 200, { success: true });
  }

  return sendJson(res, 401, { error: 'Usuario o contraseña incorrectos. Verifique sus credenciales de administrador.' });
}
