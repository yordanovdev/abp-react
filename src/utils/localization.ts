import { abp } from '../lib/abp';

export function L(key: string, sourceName: string) {
  return abp.localization.localize(key, sourceName);
}
