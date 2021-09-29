import { IRouter } from '@project-sunbird/ext-framework-server/interfaces';
import { Manifest } from '@project-sunbird/ext-framework-server/models/Manifest';
import { frameworkAPI } from '@project-sunbird/ext-framework-server/api';
import { Server } from './server';
import { RequestValidator } from './RequestValidator';
import { IOSFormMiddleware } from './middleware/IosFormMapping';

export class Router implements IRouter {

	init(app: any, manifest: Manifest, auth?: any) {
		const server: Server = frameworkAPI.getPluginInstance(manifest.id);
    const validator: RequestValidator = new RequestValidator();
		app.post('/read', validator.validateReadAPI, IOSFormMiddleware, (req, res) => { server.read(req, res) });
    app.post('/update', validator.validateUpdateAPI, (req, res) => { server.update(req, res) });
    app.post('/create', validator.validateCreateAPI, (req, res) => { server.create(req, res) });
    app.post('/list', (req, res) => { server.listAll(req, res) });
	}
}