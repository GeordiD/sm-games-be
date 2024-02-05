import { _examplesService } from '@/services/example.service';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { _examplesController } from './examples.controller';

jest.mock('@/services/examples.service');
const mockedExamplesService = jest.mocked(_examplesService);

jest.mock('pino');

const { res } = getMockRes();

describe('Examples', () => {
  it('should do a thing', () => {
    mockedExamplesService.all.mockResolvedValue([]);
    _examplesController.all(getMockReq(), res);

    expect(mockedExamplesService.all).toBeCalled();
  });
});
