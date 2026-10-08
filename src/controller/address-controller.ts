import {UserRequest} from "../type/user-request";
import {Response, NextFunction} from "express";
import {
    CreateAddressRequest,
    GetAddressRequest,
    RemoveAddressRequest,
    UpdateAddressRequest
} from "../model/address-model";
import {AddressService} from "../service/address-service";

export class AddressController {
    static async create(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const request: CreateAddressRequest = req.body as CreateAddressRequest;
            request.contact_id = Number(req.params.contactId);

            const response = await AddressService.create(req.user!, request);
            res.status(200).json({
                data: response,
            })
        } catch (e) {
            next(e);
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const request: GetAddressRequest = {
                id: Number(req.params.addressId),
                contact_id: Number(req.params.contactId)
            };

            if (Number.isNaN(request.id)) {
                res.status(400).json({
                    errors: "Address ID must be a number"
                });
                return;
            }

            const response = await AddressService.get(req.user!, request);
            res.status(200).json({
                data: response,
            })
        } catch (e) {
            next(e);
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const request: UpdateAddressRequest = req.body as UpdateAddressRequest;
            request.contact_id = Number(req.params.contactId);
            request.id = Number(req.params.addressId);

            if (Number.isNaN(request.id)) {
                res.status(400).json({
                    errors: "Address ID must be a number"
                });
                return;
            }

            const response = await AddressService.update(req.user!, request);
            res.status(200).json({
                data: response,
            })
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const request: RemoveAddressRequest = {
                id: Number(req.params.addressId),
                contact_id: Number(req.params.contactId)
            };

            if (Number.isNaN(request.id)) {
                res.status(400).json({
                    errors: "Address ID must be a number"
                });
                return;
            }

            await AddressService.remove(req.user!, request);
            res.status(200).json({
                data: "OK",
            })
        } catch (e) {
            next(e);
        }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const contactId = Number(req.params.contactId);
            if (Number.isNaN(contactId)) {
                res.status(400).json({
                    errors: "Address ID must be a number"
                });
                return;
            }

            const response = await AddressService.list(req.user!, contactId);
            res.status(200).json({
                data: response,
            })
        } catch (e) {
            next(e);
        }
    }
}