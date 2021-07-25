export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
    coveragePathIgnorePatterns: [
        "global.d.ts",
        "src/api/stub",
        "src/helpers/globals.ts",
        "testHelper.ts",
    ],
    coverageDirectory: "./jest/coverage",
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    setupFilesAfterEnv: ["./jest/setupFilesAfterEnv.ts"],
    moduleNameMapper: {
        "\\.(sa|sc|c)ss$": "identity-obj-proxy",
    },
};
