import { Dictionary } from './Dictionary';
// @ts-ignore
import { GetData, WebApi } from './WebApi.ts';

export function Logger(log: Dictionary<string>) {
    WebApi('/api/Logger', JSON.stringify(log)).then(r => true);
}

export function useLogService() {
    return GetData('/api/Logger')
}

export default { Logger, useLogService };