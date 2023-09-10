export class Neo4jModuleConfigTestFactory {
    create(input = {}) {
        return {
            databaseHost: 'localhost',
            databaseUser: 'neo4j',
            databasePassword: 'neo4j',
            ...input,
        };
    }
}
