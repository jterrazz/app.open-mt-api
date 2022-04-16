export type Deserializer<ExpectedParams> = (rawBody: unknown) => ExpectedParams;
