"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const routes_1 = __importDefault(require("./routes"));
const api_1 = require("./config/api");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiUrl: (0, api_1.getApiBaseUrl)() });
});
app.listen(PORT, () => {
    console.log(`OctoFit backend listening on port ${PORT}`);
    console.log(`API base URL: ${(0, api_1.getApiBaseUrl)()}`);
});
