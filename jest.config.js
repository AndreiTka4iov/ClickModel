module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^@commands/(.*)$": "<rootDir>/src/commands/$1"
  },
  roots: ["<rootDir>/src", "<rootDir>/tests"],
};
