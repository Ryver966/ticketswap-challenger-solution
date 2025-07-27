import "@testing-library/jest-dom";

global.Request = class {
  constructor(public url: string) {}
} as any;

class MockResponse {
  status: number;
  body: any;

  constructor(body: any, init?: { status?: number }) {
    this.status = init?.status ?? 200;
    this.body = body;
  }

  async json() {
    return typeof this.body === "string" ? JSON.parse(this.body) : this.body;
  }
}

(MockResponse as any).json = (data: any) =>
  new MockResponse(data, { status: 200 });

global.Response = MockResponse as any;
