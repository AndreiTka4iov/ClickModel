module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^@decorators/(.*)$": "<rootDir>/src/decorators/$1",
    "^@database/(.*)$": "<rootDir>/src/database/$1"
  },
  roots: ["<rootDir>/src", "<rootDir>/tests"],
};
