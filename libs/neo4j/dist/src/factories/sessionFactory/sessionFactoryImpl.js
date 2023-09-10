import { __decorate, __metadata, __param } from "tslib";
import { driver, auth } from 'neo4j-driver';
import { symbols } from '../../symbols.js';
import { Injectable, Inject } from '@libs/dependency-injection';
export let SessionFactoryImpl = class SessionFactoryImpl {
    neo4jModuleConfig;
    constructor(neo4jModuleConfig) {
        this.neo4jModuleConfig = neo4jModuleConfig;
    }
    create() {
        const { databaseHost, databaseUser, databasePassword } = this.neo4jModuleConfig;
        const neo4jDriver = driver(`neo4j://${databaseHost}`, auth.basic(databaseUser, databasePassword));
        return neo4jDriver.session();
    }
};
SessionFactoryImpl = __decorate([
    Injectable(),
    __param(0, Inject(symbols.neo4jModuleConfig)),
    __metadata("design:paramtypes", [Object])
], SessionFactoryImpl);
