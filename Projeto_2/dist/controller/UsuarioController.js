"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const UsuarioService_1 = require("../service/UsuarioService");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const UsuarioDto_1 = require("../model/dto/UsuarioDto");
const UsuarioRequestDto_1 = require("../model/dto/UsuarioRequestDto");
const tsoa_1 = require("tsoa");
let usuarioController = class usuarioController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.UsuarioService = new UsuarioService_1.UsuarioService();
    }
    cadastrarUsuario(dto, fail, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield this.UsuarioService.cadastraUsuario(dto);
                return success(201, new BasicResponseDto_1.BasicResponseDto("Usuario cadastrado com sucesso!", usuario));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    ;
    atualizarUsuario(dto, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield this.UsuarioService.atualizaUsuario(dto);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Usuario atualizado com sucesso!", usuario));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    ;
    deletarUsuario(dto, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield this.UsuarioService.deletaUsuario(dto);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Usuario deletado com sucesso!", usuario));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    ;
    filtrarUsuario(id, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield this.UsuarioService.filtraUsuario(id);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Usuario encontrado com sucesso!", usuario));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    ;
    listarUsuarios(notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield this.UsuarioService.filtrarUsuarios();
                return success(200, new BasicResponseDto_1.BasicResponseDto("Usuarios listados com sucesso!", usuarios));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    ;
};
exports.usuarioController = usuarioController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsuarioRequestDto_1.UsuarioRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], usuarioController.prototype, "cadastrarUsuario", null);
__decorate([
    (0, tsoa_1.Put)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsuarioDto_1.UsuarioDto, Function, Function]),
    __metadata("design:returntype", Promise)
], usuarioController.prototype, "atualizarUsuario", null);
__decorate([
    (0, tsoa_1.Delete)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsuarioDto_1.UsuarioDto, Function, Function]),
    __metadata("design:returntype", Promise)
], usuarioController.prototype, "deletarUsuario", null);
__decorate([
    (0, tsoa_1.Get)("id/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], usuarioController.prototype, "filtrarUsuario", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], usuarioController.prototype, "listarUsuarios", null);
exports.usuarioController = usuarioController = __decorate([
    (0, tsoa_1.Route)("usuario"),
    (0, tsoa_1.Tags)("Usuario")
], usuarioController);
