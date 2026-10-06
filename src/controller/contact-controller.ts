import {UserRequest} from "../type/user-request";
import {Response, NextFunction} from "express";
import {
    ContactResponse,
    CreateContactRequest,
    SearchContactRequest,
    UpdateContactRequest
} from "../model/contact-model";
import {ContactService} from "../service/contact-service";
import {logger} from "../application/logging";

export class ContactController {
    static async create(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const request: CreateContactRequest = req.body as CreateContactRequest;
            const response = await ContactService.create(req.user!, request);
            logger.debug("response :" + JSON.stringify(response));
            res.status(200).json({
                data: response,
            })
        } catch (e) {
            next(e);
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const contactId = Number(req.params.contactId);

            if (Number.isNaN(contactId)) {
                res.status(400).json({
                    errors: "Contact ID must be a number"
                });
                return;
            }

            const response = await ContactService.get(req.user!, contactId);
            logger.debug("response :" + JSON.stringify(response));
            res.status(200).json({
                data: response,
            })
        } catch (e) {
            next(e);
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const contactId = Number(req.params.contactId);

            if (Number.isNaN(contactId)) {
                res.status(400).json({
                    errors: "Contact ID must be a number"
                });
                return;
            }

            const request: UpdateContactRequest = {
                ...req.body,
                id: contactId,
            }
            const response = await ContactService.update(req.user!, request);
            logger.debug("response :" + JSON.stringify(response));
            res.status(200).json({
                data: response,
            })
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const contactId = Number(req.params.contactId);

            if (Number.isNaN(contactId)) {
                res.status(400).json({
                    errors: "Contact ID must be a number"
                });
                return;
            }

            await ContactService.remove(req.user!, contactId);
            res.status(200).json({
                data: "OK",
            })
        } catch (e) {
            next(e);
        }
    }

    static async search(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const request: SearchContactRequest = {
                name: req.query.name as string,
                email: req.query.email as string,
                phone: req.query.phone as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10
            }

            const response = await ContactService.search(req.user!, request);
            logger.debug("response :" + JSON.stringify(response));
            res.status(200).json({
                data: response.data,
                paging: response.paging
            })
        } catch (e) {
            next(e);
        }
    }
}