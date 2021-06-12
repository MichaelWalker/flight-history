export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}"
    ],
    coveragePathIgnorePatterns: [
        "global.d.ts",
        "src/api/stub",
    ],
    coverageDirectory: './jest/coverage',
    setupFilesAfterEnv: [
        './jest/setupFilesAfterEnv.ts',
    ],
    "moduleNameMapper": {
        "\\.(sa|sc|c)ss$": "identity-obj-proxy"
    }
};